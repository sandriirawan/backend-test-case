import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './entity/transaction.entity';
import { Member } from 'src/member/entity/member.entity';
import { Book } from 'src/book/entity/book.entity';
import { TransactionItem } from './entity/transaction-item.entity ';
import { BorrowBooksDto, ReturnBooksDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,

    @InjectRepository(TransactionItem)
    private transactionItemRepository: Repository<TransactionItem>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async borrowBooks(borrowBooksDto: BorrowBooksDto): Promise<any> {
    const { memberId, bookIds } = borrowBooksDto;
    const member = await this.memberRepository.findOne({
      where: { member_id: memberId },
    });

    if (member.penalty_date && new Date() < member.penalty_date) {
      throw new BadRequestException(
        'Member is currently under penalty and cannot borrow books.',
      );
    }

    if (member.penalty_date && new Date() >= member.penalty_date) {
      member.penalty_date = null;
      await this.memberRepository.save(member);
    }
    const duplicates = bookIds.filter(
      (item, index) => bookIds.indexOf(item) !== index,
    );

    if (duplicates.length > 0) {
      throw new BadRequestException(
        `Member has already borrowed the following books: ${duplicates.join(', ')}.`,
      );
    }

    for (const bookId of bookIds) {
      const activeTransactionItem =
        await this.transactionItemRepository.findOne({
          where: { book_id: bookId, is_returned: false },
        });
      if (activeTransactionItem) {
        throw new BadRequestException(
          `Book with ID ${bookId} is already borrowed by another member.`,
        );
      }
    }

    const activeTransactionsCount = await this.transactionItemRepository.count({
      where: {
        member_id: memberId,
        is_returned: false,
      },
    });

    if (activeTransactionsCount >= 2 || bookIds.length > 2) {
      throw new BadRequestException('Member cannot borrow more than 2 books.');
    }

    const newTransaction = this.transactionRepository.create({
      member_id: memberId,
      start_date: new Date(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: TransactionStatus.IS_BORROWED,
    });

    await this.transactionRepository.save(newTransaction);

    for (const bookId of bookIds) {
      const book = await this.bookRepository.findOne({
        where: { book_id: bookId },
      });
      if (!book) {
        throw new BadRequestException(`Book with ID ${bookId} not found.`);
      }

      if (book.stock <= 0) {
        throw new BadRequestException(
          `Book with ID ${bookId} is out of stock.`,
        );
      }

      const transactionItem = this.transactionItemRepository.create({
        transaction_id: newTransaction.transaction_id,
        book_id: bookId,
        member_id: memberId,
        is_returned: false,
      });
      await this.transactionItemRepository.save(transactionItem);

      book.stock -= 1;
      await this.bookRepository.save(book);
    }

    return {
      message: 'Books borrowed successfully',
      transactionId: newTransaction.transaction_id,
    };
  }

  async returnBooks(returnBooksDto: ReturnBooksDto): Promise<any> {
    const { memberId, bookIds } = returnBooksDto;

    const member = await this.memberRepository.findOne({
      where: { member_id: memberId },
    });

    if (!member) {
      throw new BadRequestException('Member not found.');
    }

    for (const bookId of bookIds) {
      const transactionItem = await this.transactionItemRepository.findOne({
        where: { book_id: bookId, is_returned: false },
      });

      if (!transactionItem) {
        throw new BadRequestException(
          `Book with ID ${bookId} was not borrowed by this member.`,
        );
      }

      const transaction = await this.transactionRepository.findOne({
        where: { transaction_id: transactionItem.transaction_id },
      });

      if (!transaction) {
        throw new BadRequestException(
          `Transaction not found for the book with ID ${bookId}.`,
        );
      }

      const startDate = new Date(transaction.start_date);
      const daysDiff = Math.floor(
        (new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24),
      );

      if (daysDiff > 7) {
        member.penalty_date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
        await this.memberRepository.save(member);
      }

      transactionItem.is_returned = true;
      await this.transactionItemRepository.save(transactionItem);

      transaction.status = TransactionStatus.IS_RETURNED;
      transaction.end_date = new Date();
      await this.transactionRepository.save(transaction);

      const book = await this.bookRepository.findOne({
        where: { book_id: bookId },
      });

      if (book) {
        book.stock += 1;
        await this.bookRepository.save(book);
      }
    }

    return {
      message: 'Books returned successfully',
    };
  }

  async getAllMembers(): Promise<Member[]> {
    const members = await this.memberRepository.find();
    const memberData = await Promise.all(
      members.map(async (member) => {
        const borrowedCount = await this.transactionItemRepository.count({
          where: {
            member_id: member.member_id,
            is_returned: false,
          },
        });
        const borrowedBooks = await this.transactionItemRepository.find({
          where: {
            member_id: member.member_id,
            is_returned: false,
          },
        });

        const bookIds = borrowedBooks.map((item) => item.book_id);
        const borrowedBooksDetails = await this.bookRepository.find({
          where: { book_id: In(bookIds) },
        });
        const borrowedBookTitles = borrowedBooksDetails.map(
          (book) => book.title,
        );
        return {
          ...member,
          borrowedCount,
          borrowedBookTitles,
        };
      }),
    );
    return memberData;
  }
}

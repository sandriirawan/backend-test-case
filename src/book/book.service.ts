import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(title?: string): Promise<Book[]> {
    if (title) {
      return this.bookRepository.find({
        where: { title: ILike(`%${title}%`) },
      });
    }
    return this.bookRepository.find();
  }
  async findOne(book_id: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { book_id } });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(book);
  }

  async update(book_id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.bookRepository.update(book_id, updateBookDto);
    return this.bookRepository.findOne({ where: { book_id } });
  }

  async delete(book_id: string): Promise<void> {
    await this.bookRepository.delete(book_id);
  }
}

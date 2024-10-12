import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionItem } from './entity/transaction-item.entity ';
import { Book } from 'src/book/entity/book.entity';
import { Member } from 'src/member/entity/member.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, TransactionItem, Book, Member]),
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}

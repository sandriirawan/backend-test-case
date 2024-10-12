import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import configs from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entity/book.entity';
import { Member } from './member/entity/member.entity';
import { MemberModule } from './member/member.repository';
import { TransactionItem } from './transaction/entity/transaction-item.entity ';
import { Transaction } from './transaction/entity/transaction.entity';
import { TransactionModule } from './transaction/transaction.module';
import { AlgoritmaModule } from './algoritmams/algorithms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'masukaja',
      database: 'library',
      entities: [Book, Member, Transaction, TransactionItem],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    BookModule,
    MemberModule,
    TransactionModule,
    AlgoritmaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

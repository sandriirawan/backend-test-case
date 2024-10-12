import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionStatus {
  IS_BORROWED = 'trans_is_borrowed',
  IS_RETURNED = 'trans_is_returned',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transaction_id: string;

  @Column('uuid')
  member_id: string;

  @Column({ type: 'date', nullable: true })
  start_date: Date;

  @Column({ type: 'date', nullable: true })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.IS_BORROWED,
  })
  status: TransactionStatus;
}

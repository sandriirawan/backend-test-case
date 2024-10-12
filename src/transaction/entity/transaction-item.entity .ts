import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TransactionItem {
  @PrimaryGeneratedColumn('uuid')
  transaction_item_id: string;

  @Column('uuid')
  transaction_id: string;

  @Column('uuid')
  book_id: string;

  @Column('uuid', { nullable: true })
  member_id: string;

  @Column({ default: false })
  is_returned: boolean;
}

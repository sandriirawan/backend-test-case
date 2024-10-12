import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  book_id: string;

  @Column()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}

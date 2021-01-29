import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  author: string;

  @Column()
  price: number;

  @Column({ default: true })
  inStock: boolean;
}

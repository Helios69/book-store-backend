import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    return await this.booksRepository.findOne(id);
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    newBook.slug = createBookDto.name.toLowerCase().split(' ').join('-');
    await this.booksRepository.save(newBook);
    return newBook;
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.booksRepository.preload({
      id: +id,
      ...updateBookDto,
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found.`);
    }
    await this.booksRepository.save(book);
    return book;
  }

  async deleteBook(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book ${id} not found.`);
    }
    await this.booksRepository.remove(book);
    return book;
  }
}

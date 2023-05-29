import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Books } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async addBook(book: CreateBookInput): Promise<Books> {
    try {
      return await this.prisma.books.create({
        data: {
          book_isbn: book.book_isbn,
          book_name: book.book_name,
          book_author: book.book_author,
          year_published: book.year_published,
          quantity: book.quantity,
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getAllBooks(page: number, size: number): Promise<Books[]> {
    try {
      return await this.prisma.books.findMany({
        skip: (page - 1) * size,
        take: size,
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async searchBook(title: string): Promise<Books[]> {
    try {
      return await this.prisma.books.findMany({
        where: {
          OR: [
            {
              book_name: {
                contains: title,
              },
            },
            {
              book_author: {
                contains: title,
              },
            },
          ],
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async searchBookByISBN(isbn: string) {
    const book = await this.prisma.books.findUnique({
      where: { book_isbn: isbn },
    });

    if (!book) throw new NotFoundException();

    return book;
  }

  async updateBook(id: number, book: UpdateBookInput): Promise<Books> {
    try {
      return await this.prisma.books.update({
        where: { bid: id },
        data: { ...book },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async removeBook(id: number): Promise<Books> {
    try {
      return await this.prisma.books.delete({ where: { bid: id } });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

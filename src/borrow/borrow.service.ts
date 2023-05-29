import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Borrow } from '@prisma/client';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';

@Injectable()
export class BorrowService {
  constructor(
    private prisma: PrismaService,
    private bookService: BookService,
  ) {}

  async addBorrowBook(borrowBook: CreateBorrowInput): Promise<Borrow> {
    try {
      const books = await this.bookService.searchBookByISBN(
        borrowBook.book_isbn,
      );

      // checks book current quantity
      const { quantity: currentQuantity } = await this.prisma.books.findUnique({
        where: { bid: books.bid },
      });

      if (currentQuantity === 0)
        throw new HttpException('Not enough books', 400);

      const addBorrow = await this.prisma.borrow.create({
        data: {
          student_id: borrowBook.student_id,
          coll_id: borrowBook.coll_id,
          book_isbn: borrowBook.book_isbn,
          time_borrow: borrowBook.time_borrow,
          time_return: borrowBook.time_return,
          fines: borrowBook.fines,
          action: borrowBook.action,
        },
        include: {
          books: {
            select: {
              book_isbn: true,
              book_name: true,
            },
          },
          students: {
            select: {
              sid: true,
              student_name: true,
            },
          },
          colleges: {
            select: {
              id: true,
              college_name: true,
            },
          },
        },
      });

      if (!addBorrow) throw new BadRequestException();

      // everytime student borrow a book then the selected book quantity decreasing
      const updateBookQuantity = await this.prisma.books.update({
        where: { bid: books.bid },
        data: {
          quantity: currentQuantity === 0 ? 0 : currentQuantity - 1,
        },
      });

      if (!updateBookQuantity) throw new BadRequestException();

      console.log(addBorrow);

      return addBorrow;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllBorrowedBooks(page: number, size: number): Promise<Borrow[]> {
    const results = await this.prisma.borrow.findMany({
      include: {
        books: {
          select: {
            book_isbn: true,
            book_name: true,
          },
        },
        students: {
          select: {
            sid: true,
            student_name: true,
          },
        },
        colleges: {
          select: {
            id: true,
            college_name: true,
          },
        },
      },
      skip: (page - 1) * size,
      take: size,
    });

    if (!results) throw new BadRequestException();

    console.log(results);

    return results;
  }

  async searchBorrowedBook(name: string) {
    try {
      return await this.prisma.borrow.findMany({
        where: {
          OR: [
            {
              books: {
                book_name: { contains: name },
              },
            },
            {
              students: {
                student_name: { contains: name },
              },
            },
          ],
        },
        include: {
          books: {
            select: {
              book_isbn: true,
              book_name: true,
            },
          },
          students: {
            select: {
              sid: true,
              student_name: true,
            },
          },
          colleges: {
            select: {
              id: true,
              college_name: true,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateBorrowedBook(id: number, books: UpdateBorrowInput) {
    try {
      return await this.prisma.borrow.update({
        where: { borrow_id: id },
        data: {
          student_id: books.student_id,
          coll_id: books.coll_id,
          book_isbn: books.book_isbn,
          time_borrow: books.time_borrow,
          time_return: books.time_return,
          fines: books.fines,
          action: books.action,
        },

        include: {
          books: {
            select: {
              book_isbn: true,
              book_name: true,
            },
          },
          students: {
            select: {
              sid: true,
              student_name: true,
            },
          },
          colleges: {
            select: {
              id: true,
              college_name: true,
            },
          },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async removeBorrowedBook(id: number) {
    try {
      return await this.prisma.borrow.delete({
        where: { borrow_id: id },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}

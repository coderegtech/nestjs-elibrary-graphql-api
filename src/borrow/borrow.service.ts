import { BadRequestException, Injectable } from '@nestjs/common';
import { Borrow } from '@prisma/client';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';

@Injectable()
export class BorrowService {
  constructor(
    private prisma: PrismaService,
    private bookService: BookService
  ) { }

  async addBorrowBook(borrowBook: CreateBorrowInput): Promise<Borrow> {
    const books = await this.bookService.searchBookByISBN(borrowBook.book_isbn)

    const addBorrow = await this.prisma.borrow.create({
      data: {
        student_id: borrowBook.student_id,
        coll_id: borrowBook.coll_id,
        book_isbn: borrowBook.book_isbn,
        time_borrow: borrowBook.time_borrow,
        time_return: borrowBook.time_return,
        fines: borrowBook.fines,
        action: borrowBook.action
      },
      include: {
        books: {
          select: {
            book_isbn: true,
            book_name: true
          }
        },
        students: {
          select: {
            sid: true,
            student_name: true
          }
        },
        colleges: {
          select: {
            id: true,
            college_name: true
          }
        }


      }
    });

    if (!addBorrow) throw new BadRequestException();

    // everytime student borrow a book then the selected book quantity decreasing
    const { quantity: currentQuantity } = await this.prisma.books.findUnique({ where: { bid: books.bid } })

    if (currentQuantity === 0) {
      throw new BadRequestException('Not enough books', { cause: new Error(), description: 'Error: Not Enough Books' })
      return;
    }

    const updateBookQuantity = await this.prisma.books.update({
      where: { bid: books.bid }, data: {
        quantity: currentQuantity === 0 ? 0 : currentQuantity - 1
      }
    })

    if (!updateBookQuantity) throw new BadRequestException()

    console.log(addBorrow);
    return addBorrow

  }

  async getAllBorrowedBooks(): Promise<Borrow[]> {


    const results = await this.prisma.borrow.findMany({
      include: {
        books: {
          select: {
            book_isbn: true,
            book_name: true
          }
        },
        students: {
          select: {
            sid: true,
            student_name: true
          }
        },
        colleges: {
          select: {
            id: true,
            college_name: true
          }
        }


      }
    })

    if (!results) throw new BadRequestException()

    console.log(results);

    return results



  }


  async searchBorrowedBook(name: string) {
    try {

      // return await this.prisma.borrow.findMany({
      //   where: {
      //     OR: [
      //       {
      //         books: {
      //           book_name: name
      //         }
      //       },
      //       {
      //         students: {
      //           student_name: name
      //         }
      //       }
      //     ]

      //   },
      //   include: {
      //     books: {
      //       select: {
      //         book_isbn: true,
      //         book_name: true
      //       }
      //     },
      //     students: {
      //       include: {
      //         colleges: {
      //           select: {
      //             college_name: true
      //           }
      //         }
      //       }
      //     },


      //   }

      // })

    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }


  async updateBorrowedBook(id: number, books: UpdateBorrowInput) {
    try {
      // return await this.prisma.borrow.update({ where: { book_id: id }, data: { ...book } })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async removeBorrowedBook(id: number) {
    try {
      return await this.prisma.borrow.delete({ where: { borrow_id: id } })
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}

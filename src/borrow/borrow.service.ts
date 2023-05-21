import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';

@Injectable()
export class BorrowService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async addBorrowBook(borrowBook: CreateBorrowInput) {

    const addBorrow = await this.prisma.borrow.create({
      data: {
        student_id: borrowBook.student_id,
        coll_id: borrowBook.coll_id,
        book_isbn: borrowBook.book_isbn,
        time_borrow: borrowBook.time_borrow,
        time_return: borrowBook.time_return,
        fines: borrowBook.fines,
        action: borrowBook.action
      }
    })

    if (!addBorrow) throw new BadRequestException()

    // everytime student borrow a book then the selected book quantity decreasing
    const { quantity: currentQuantity } = await this.prisma.books.findUnique({ where: { book_isbn: borrowBook.book_isbn } })

    const updateBookQuantity = await this.prisma.books.update({
      where: { book_isbn: borrowBook.book_isbn }, data: {
        quantity: currentQuantity - 1
      }
    })

    if (!updateBookQuantity) throw new BadRequestException()

    console.log(addBorrow);

    return addBorrow

  }

  async getAllBorrowedBooks() {
    try {

      const results = await this.prisma.borrow.findMany({
        include: {
          book: {
            select: {
              book_isbn: true,
              book_name: true
            }
          },
          student: {
            include: {
              colleges: {
                select: {
                  college_name: true
                }
              }
            }
          },


        }
      })



      return results

    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async searchBorrowedBook(title: string) {
    try {





    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }


  async updateBorrowedBook(id: number, book: UpdateBorrowInput) {
    try {
      return await this.prisma.books.update({ where: { bid: id }, data: { ...book } })
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

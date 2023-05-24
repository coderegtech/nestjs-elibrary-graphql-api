import { Module } from '@nestjs/common';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BorrowResolver } from './borrow.resolver';
import { BorrowService } from './borrow.service';

@Module({
  providers: [BorrowResolver, BorrowService, PrismaService, BookService]
})
export class BorrowModule { }

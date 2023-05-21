import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookResolver } from './book.resolver';
import { BookService } from './book.service';

@Module({
  providers: [BookResolver, BookService, PrismaService]
})
export class BookModule { }

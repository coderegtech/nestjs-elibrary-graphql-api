import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BorrowResolver } from './borrow.resolver';
import { BorrowService } from './borrow.service';

@Module({
  providers: [BorrowResolver, BorrowService, PrismaService]
})
export class BorrowModule { }

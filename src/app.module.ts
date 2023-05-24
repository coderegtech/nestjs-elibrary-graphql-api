import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { PrismaService } from './prisma/prisma.service';
import { StudentModule } from './student/student.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    StudentModule,
    BookModule,
    BorrowModule,

  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/entities/book.entity';
import { Student } from 'src/student/entities/student.entity';


@ObjectType()
export class Colleges {
  @Field(() => Int)
  id: number

  @Field()
  college_name: string
}


@ObjectType()
export class Borrow {
  @Field(() => Int)
  borrow_id: number

  @Field(() => Int)
  student_id: number

  @Field(() => Int)
  coll_id: number

  @Field()
  book_isbn: string

  @Field()
  time_borrow: Date

  @Field({ nullable: true })
  time_return?: Date

  @Field(() => Int)
  fines: number

  @Field()
  action: string


  @Field(() => Book, { nullable: true })
  books: Book

  @Field(() => Student, { nullable: true })
  students: Student

  @Field(() => Colleges, { nullable: true })
  colleges: Colleges
}




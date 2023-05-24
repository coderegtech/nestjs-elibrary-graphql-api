import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBorrowInput } from './create-borrow.input';

@InputType()
export class UpdateBorrowInput extends PartialType(CreateBorrowInput) {
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

  @Field()
  time_return: Date

  @Field(() => Int)
  fines: number

  @Field()
  action: string

  @Field(() => Int)
  book_id: number
}

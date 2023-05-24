import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBorrowInput {
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


}

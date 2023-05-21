import { Field, Int, ObjectType } from '@nestjs/graphql';

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

  @Field()
  time_return: Date

  @Field(() => Int)
  fines: number

  @Field()
  action: string
}

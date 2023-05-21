import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {

  @Field()
  book_name: string

  @Field()
  book_author: string

  @Field()
  book_isbn: string

  @Field(() => Int)
  year_published: number

  @Field(() => Int)
  quantity: number
}

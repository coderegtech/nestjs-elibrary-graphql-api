import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  bid: number

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


import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateBookInput } from './create-book.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => ID)
  bid: number

  @Field()
  book_name?: string

  @Field()
  book_author?: string

  @Field()
  book_isbn?: string

  @Field(() => Int)
  year_published?: number

  @Field(() => Int)
  quantity?: number
}

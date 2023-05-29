import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BookService } from './book.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.addBook(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll(
    @Args('page', { type: () => Number }) page: number,
    @Args('size', { type: () => Number }) size: number,
  ) {
    return this.bookService.getAllBooks(page, size);
  }

  @Query(() => [Book], { name: 'searchBook' })
  findOne(@Args('title', { type: () => String }) title: string) {
    return this.bookService.searchBook(title);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.updateBook(updateBookInput.bid, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => Int }) id: number) {
    return this.bookService.removeBook(id);
  }
}

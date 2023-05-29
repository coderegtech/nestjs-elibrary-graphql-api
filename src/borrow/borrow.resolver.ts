import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BorrowService } from './borrow.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';
import { Borrow } from './entities/borrow.entity';

@Resolver(() => Borrow)
export class BorrowResolver {
  constructor(private readonly borrowService: BorrowService) {}

  @Mutation(() => Borrow)
  async createBorrow(
    @Args('createBorrowInput') createBorrowInput: CreateBorrowInput,
  ) {
    return await this.borrowService.addBorrowBook(createBorrowInput);
  }

  @Query(() => [Borrow], { name: 'borrowedBooks' })
  async findAllBorrowedBooks(
    @Args('page', { type: () => Number }) page: number,
    @Args('size', { type: () => Number }) size: number,
  ) {
    return await this.borrowService.getAllBorrowedBooks(page, size);
  }

  @Query(() => [Borrow], { name: 'searchBorrowedBooks' })
  async findOneBorrowedBook(
    @Args('borrowedBooks', { type: () => String }) name: string,
  ) {
    return await this.borrowService.searchBorrowedBook(name);
  }

  @Mutation(() => Borrow)
  async updateBorrow(
    @Args('updateBorrowInput') updateBorrowInput: UpdateBorrowInput,
  ) {
    return await this.borrowService.updateBorrowedBook(
      updateBorrowInput.borrow_id,
      updateBorrowInput,
    );
  }

  @Mutation(() => Borrow)
  async removeBorrow(@Args('id', { type: () => Int }) id: number) {
    return await this.borrowService.removeBorrowedBook(id);
  }
}

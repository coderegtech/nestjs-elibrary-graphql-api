import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BorrowService } from './borrow.service';
import { CreateBorrowInput } from './dto/create-borrow.input';
import { UpdateBorrowInput } from './dto/update-borrow.input';
import { Borrow } from './entities/borrow.entity';

@Resolver(() => Borrow)
export class BorrowResolver {
  constructor(private readonly borrowService: BorrowService) { }

  @Mutation(() => Borrow)
  createBorrow(@Args('createBorrowInput') createBorrowInput: CreateBorrowInput) {
    return this.borrowService.addBorrowBook(createBorrowInput);
  }

  @Query(() => [Borrow], { name: 'borrowedBooks' })
  findAllBorrowedBooks() {
    return this.borrowService.getAllBorrowedBooks();
  }

  @Query(() => Borrow, { name: 'borrow' })
  findOne(@Args('bookname', { type: () => String }) title: string) {
    return this.borrowService.searchBorrowedBook(title);
  }

  @Mutation(() => Borrow)
  updateBorrow(@Args('updateBorrowInput') updateBorrowInput: UpdateBorrowInput) {
    return this.borrowService.updateBorrowedBook(updateBorrowInput.borrow_id, updateBorrowInput);
  }

  @Mutation(() => Borrow)
  removeBorrow(@Args('id', { type: () => Int }) id: number) {
    return this.borrowService.removeBorrowedBook(id);
  }
}

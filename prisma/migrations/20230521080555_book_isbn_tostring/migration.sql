-- DropForeignKey
ALTER TABLE `Borrow` DROP FOREIGN KEY `Borrow_book_isbn_fkey`;

-- AlterTable
ALTER TABLE `Books` MODIFY `book_isbn` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Borrow` MODIFY `book_isbn` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_book_isbn_fkey` FOREIGN KEY (`book_isbn`) REFERENCES `Books`(`book_isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;

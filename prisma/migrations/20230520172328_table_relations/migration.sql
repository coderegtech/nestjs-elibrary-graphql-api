/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Colleges` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `_StudentToBook` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentToBook_AB_unique`(`A`, `B`),
    INDEX `_StudentToBook_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Colleges_id_key` ON `Colleges`(`id`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_college_id_fkey` FOREIGN KEY (`college_id`) REFERENCES `Colleges`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `Student`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_book_isbn_fkey` FOREIGN KEY (`book_isbn`) REFERENCES `Books`(`book_isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToBook` ADD CONSTRAINT `_StudentToBook_A_fkey` FOREIGN KEY (`A`) REFERENCES `Books`(`bid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToBook` ADD CONSTRAINT `_StudentToBook_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;

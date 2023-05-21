-- CreateTable
CREATE TABLE `Student` (
    `sid` INTEGER NOT NULL,
    `student_name` VARCHAR(191) NOT NULL,
    `corporate_email` VARCHAR(191) NOT NULL,
    `college_id` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `date_add` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Student_sid_key`(`sid`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Books` (
    `bid` INTEGER NOT NULL AUTO_INCREMENT,
    `book_name` VARCHAR(191) NOT NULL,
    `book_author` VARCHAR(191) NOT NULL,
    `book_isbn` BIGINT NOT NULL,
    `year_published` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `Books_bid_key`(`bid`),
    UNIQUE INDEX `Books_book_isbn_key`(`book_isbn`),
    PRIMARY KEY (`bid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Borrow` (
    `borrow_id` INTEGER NOT NULL AUTO_INCREMENT,
    `student_id` INTEGER NOT NULL,
    `coll_id` INTEGER NOT NULL,
    `book_isbn` BIGINT NOT NULL,
    `time_borrow` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time_return` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fines` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Borrow_borrow_id_key`(`borrow_id`),
    UNIQUE INDEX `Borrow_student_id_key`(`student_id`),
    UNIQUE INDEX `Borrow_book_isbn_key`(`book_isbn`),
    PRIMARY KEY (`borrow_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colleges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `college_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_college_id_fkey` FOREIGN KEY (`college_id`) REFERENCES `Colleges`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_book_isbn_fkey` FOREIGN KEY (`book_isbn`) REFERENCES `Books`(`book_isbn`) ON DELETE RESTRICT ON UPDATE CASCADE;

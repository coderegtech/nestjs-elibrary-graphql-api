-- AddForeignKey
ALTER TABLE `Borrow` ADD CONSTRAINT `Borrow_coll_id_fkey` FOREIGN KEY (`coll_id`) REFERENCES `Colleges`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `Date` on the `SportSchedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `SportSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SportSchedule` DROP COLUMN `Date`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL;

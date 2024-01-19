/*
  Warnings:

  - You are about to drop the column `login` on the `Mail` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Mail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mail" DROP COLUMN "login",
DROP COLUMN "password";

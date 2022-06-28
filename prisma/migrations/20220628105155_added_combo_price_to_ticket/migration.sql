/*
  Warnings:

  - Made the column `description` on table `tickets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "combo_price" INTEGER DEFAULT 0,
ALTER COLUMN "description" SET NOT NULL;

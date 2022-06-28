/*
  Warnings:

  - Added the required column `status` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" ADD COLUMN     "status" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "adult_price" SET DEFAULT 0,
ALTER COLUMN "kid_price" SET DEFAULT 0;

/*
  Warnings:

  - Added the required column `ordered` to the `Product_name` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product_name" ADD COLUMN     "ordered" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "example" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

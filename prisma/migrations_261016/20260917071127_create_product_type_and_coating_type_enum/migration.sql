/*
  Warnings:

  - Changed the type of `Type` on the `Coating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `Product_name` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Product_type" AS ENUM ('Revolume', 'Revxium');

-- CreateEnum
CREATE TYPE "Coating_type" AS ENUM ('Al_Zn', 'Zn');

-- AlterTable
ALTER TABLE "Coating" DROP COLUMN "Type",
ADD COLUMN     "Type" "Coating_type" NOT NULL;

-- AlterTable
ALTER TABLE "Product_name" DROP COLUMN "type",
ADD COLUMN     "type" "Product_type" NOT NULL;

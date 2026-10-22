/*
  Warnings:

  - Made the column `updatedAt` on table `Coating_composition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Dimension` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Lab_result` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coating_composition" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dimension" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Lab_result" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

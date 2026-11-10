/*
  Warnings:

  - The `entityId` column on the `activity_logs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "activity_logs" DROP COLUMN "entityId",
ADD COLUMN     "entityId" UUID;

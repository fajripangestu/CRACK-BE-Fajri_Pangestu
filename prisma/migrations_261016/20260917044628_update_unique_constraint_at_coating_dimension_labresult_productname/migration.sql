/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Coating` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Dimension` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Lab_result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product_name` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coating_name_key" ON "Coating"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dimension_name_key" ON "Dimension"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_result_code_key" ON "Lab_result"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_name_key" ON "Product_name"("name");

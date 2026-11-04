-- DropForeignKey
ALTER TABLE "CustomerOrder" DROP CONSTRAINT "CustomerOrder_productNameId_fkey";

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_productNameId_fkey" FOREIGN KEY ("productNameId") REFERENCES "Product_name"("id") ON DELETE SET NULL ON UPDATE CASCADE;

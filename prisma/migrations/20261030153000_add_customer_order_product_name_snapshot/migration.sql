ALTER TABLE "CustomerOrder"
ADD COLUMN "productName" TEXT;

UPDATE "CustomerOrder"
SET "productName" = CONCAT(
  "BMT"::text,
  ' mm x ',
  "width"::text,
  ' mm x ',
  "Grade",
  ' x ',
  "coatingMass"::text,
  ' g/m² x ',
  "chemicalTreatment"::text
);

ALTER TABLE "CustomerOrder"
ALTER COLUMN "productName" SET NOT NULL;

ALTER TABLE "CustomerOrder"
ALTER COLUMN "productNameId" DROP NOT NULL;

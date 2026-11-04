-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'OWNER', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('PRODUCTION', 'QA', 'PPC', 'PROCUREMENT', 'ENGINEER', 'IT', 'SALES', 'WAREHOUSE', 'MAINTENANCE', 'HRD', 'OWNER', 'CUSTOMER', 'OTHER');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('OWNER', 'GENERAL_MANAGER', 'CONSULTANT', 'GM_ASSISTANT', 'MANAGER', 'SUPERVISOR', 'TEAM_LEADER', 'ENGINEER', 'ADMINISTRATIVE_STAFF', 'OPERATOR', 'TESTER', 'CUSTOMER', 'INTERNSHIP', 'OTHER');

-- CreateEnum
CREATE TYPE "Product_type" AS ENUM ('Revolume', 'Revxium');

-- CreateEnum
CREATE TYPE "Coating_type" AS ENUM ('Al_Zn', 'Zn');

-- CreateEnum
CREATE TYPE "Product_status" AS ENUM ('Prime', 'Medium', 'Second', 'Downgrade', 'Hold');

-- CreateEnum
CREATE TYPE "Chemical_Treatment" AS ENUM ('Clear_Resin', 'Tinted_Resin', 'Passivation');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "department" "Department" NOT NULL DEFAULT 'CUSTOMER',
    "position" "Position" NOT NULL DEFAULT 'CUSTOMER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedBy" UUID NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dimension" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidthStandard" (
    "id" UUID NOT NULL,
    "standardName" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "lowerRangeWidth" DOUBLE PRECISION NOT NULL,
    "upperRangeWidth" DOUBLE PRECISION NOT NULL,
    "minusWidthTolerance" DOUBLE PRECISION NOT NULL,
    "plusWidthTolerance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WidthStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThicknessStandard" (
    "id" UUID NOT NULL,
    "standardName" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "lowerRangeWidth" DOUBLE PRECISION NOT NULL,
    "upperRangeWidth" DOUBLE PRECISION NOT NULL,
    "lowerRangeThickness" DOUBLE PRECISION NOT NULL,
    "upperRangeThickness" DOUBLE PRECISION NOT NULL,
    "minusThicknessTolerance" DOUBLE PRECISION NOT NULL,
    "plusThicknessTolerance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThicknessStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YSStandard" (
    "id" UUID NOT NULL,
    "standardName" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "YS" INTEGER NOT NULL,
    "minusYSTolerance" DOUBLE PRECISION NOT NULL,
    "plusYSTolerance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YSStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TSStandard" (
    "id" UUID NOT NULL,
    "standardName" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "TS" INTEGER NOT NULL,
    "minusTSTolerance" DOUBLE PRECISION NOT NULL,
    "plusTSTolerance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TSStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElongationStandard" (
    "id" UUID NOT NULL,
    "standardName" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "Elongation" DOUBLE PRECISION NOT NULL,
    "minusElTolerance" DOUBLE PRECISION NOT NULL,
    "plusElTolerance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElongationStandard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab_result" (
    "id" UUID NOT NULL,
    "productCode" TEXT NOT NULL,
    "YS" INTEGER NOT NULL,
    "TS" INTEGER NOT NULL,
    "Elongation" DOUBLE PRECISION NOT NULL,
    "Coating_mass" DOUBLE PRECISION NOT NULL,
    "BMT" DOUBLE PRECISION NOT NULL,
    "TCT" DOUBLE PRECISION NOT NULL,
    "Width" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lab_result_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInspectionResult" (
    "id" UUID NOT NULL,
    "productCode" TEXT NOT NULL,

    CONSTRAINT "ProductInspectionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coating_composition" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "Zn" DOUBLE PRECISION NOT NULL,
    "Al" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coating_composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coating" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "Type" "Coating_type" NOT NULL,
    "Coating_mass" INTEGER NOT NULL,
    "Chemical_treatment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material_location" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updateBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Material_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_name" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Product_type" NOT NULL,
    "grade" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "ordered" BOOLEAN NOT NULL DEFAULT false,
    "dimensionId" UUID NOT NULL,

    CONSTRAINT "Product_name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerOrder" (
    "id" UUID NOT NULL,
    "SO" TEXT NOT NULL,
    "productNameId" UUID NOT NULL,
    "productType" "Product_type" NOT NULL,
    "coatingType" "Coating_type" NOT NULL,
    "coatingMass" INTEGER NOT NULL,
    "TCT" DOUBLE PRECISION NOT NULL,
    "minTCT" DOUBLE PRECISION NOT NULL,
    "maxTCT" DOUBLE PRECISION NOT NULL,
    "BMT" DOUBLE PRECISION NOT NULL,
    "minBMT" DOUBLE PRECISION NOT NULL,
    "maxBMT" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "minWidth" DOUBLE PRECISION NOT NULL,
    "maxWidth" DOUBLE PRECISION NOT NULL,
    "Grade" TEXT NOT NULL,
    "YS" INTEGER NOT NULL,
    "minYS" INTEGER NOT NULL,
    "maxYS" INTEGER NOT NULL,
    "TS" INTEGER NOT NULL,
    "minTS" INTEGER NOT NULL,
    "maxTS" INTEGER NOT NULL,
    "EL" DOUBLE PRECISION NOT NULL,
    "minEL" DOUBLE PRECISION NOT NULL,
    "maxEL" DOUBLE PRECISION NOT NULL,
    "chemicalTreatment" "Chemical_Treatment" NOT NULL,
    "minCoilWeight" INTEGER NOT NULL,
    "maxCoilWeight" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "export" TEXT NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "orderAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "customerDetailId" UUID NOT NULL,

    CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerDetail" (
    "id" UUID NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "CustomerDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dimension_name_key" ON "Dimension"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_result_productCode_key" ON "Lab_result"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProductInspectionResult_productCode_key" ON "ProductInspectionResult"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "Coating_name_key" ON "Coating"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_name_key" ON "Product_name"("name");

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_name" ADD CONSTRAINT "Product_name_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "Dimension"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_productNameId_fkey" FOREIGN KEY ("productNameId") REFERENCES "Product_name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOrder" ADD CONSTRAINT "CustomerOrder_customerDetailId_fkey" FOREIGN KEY ("customerDetailId") REFERENCES "CustomerDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerDetail" ADD CONSTRAINT "CustomerDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

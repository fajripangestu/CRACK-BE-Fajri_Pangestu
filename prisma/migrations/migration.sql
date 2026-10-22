-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

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
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedBy" INTEGER NOT NULL,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dimension" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dimension_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lab_result" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "Tensile" INTEGER NOT NULL,
    "Yield" INTEGER NOT NULL,
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
CREATE TABLE "Coating_composition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Zn" DOUBLE PRECISION NOT NULL,
    "Al" DOUBLE PRECISION NOT NULL,
    "Ti" DOUBLE PRECISION NOT NULL,
    "Si" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coating_composition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coating" (
    "id" SERIAL NOT NULL,
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
    "id" SERIAL NOT NULL,
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
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Product_type" NOT NULL,
    "dimension" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "coating" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT NOT NULL,
    "ordered" BOOLEAN NOT NULL,

    CONSTRAINT "Product_name_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "example" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "SO" TEXT NOT NULL,
    "productName" INTEGER NOT NULL,
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
    "customerDetail" INTEGER NOT NULL,
    "minCoilWeight" INTEGER NOT NULL,
    "maxCoilWeight" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "export" TEXT NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "productionStatus" TEXT NOT NULL,
    "orderAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "CustomerOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dimension_name_key" ON "Dimension"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_result_code_key" ON "Lab_result"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Coating_name_key" ON "Coating"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_name_key" ON "Product_name"("name");

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


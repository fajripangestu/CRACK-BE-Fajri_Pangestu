-- CreateTable
CREATE TABLE "Coating" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Coating_mass" INTEGER NOT NULL,
    "Chemical_treatment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Coating_pkey" PRIMARY KEY ("id")
);

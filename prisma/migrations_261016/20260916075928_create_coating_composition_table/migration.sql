-- CreateTable
CREATE TABLE "Coating_composition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Zn" DOUBLE PRECISION NOT NULL,
    "Al" DOUBLE PRECISION NOT NULL,
    "Ti" DOUBLE PRECISION NOT NULL,
    "Si" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Coating_composition_pkey" PRIMARY KEY ("id")
);

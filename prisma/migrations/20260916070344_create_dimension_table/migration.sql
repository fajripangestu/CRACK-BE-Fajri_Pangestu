-- CreateTable
CREATE TABLE "Dimension" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "thickness" DOUBLE PRECISION NOT NULL,
    "width" INTEGER NOT NULL,

    CONSTRAINT "Dimension_pkey" PRIMARY KEY ("id")
);

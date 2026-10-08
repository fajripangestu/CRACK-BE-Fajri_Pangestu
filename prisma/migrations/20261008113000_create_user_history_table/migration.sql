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

-- AddForeignKey
ALTER TABLE "UserHistory"
ADD CONSTRAINT "UserHistory_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory"
ADD CONSTRAINT "UserHistory_changedBy_fkey"
FOREIGN KEY ("changedBy") REFERENCES "User"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

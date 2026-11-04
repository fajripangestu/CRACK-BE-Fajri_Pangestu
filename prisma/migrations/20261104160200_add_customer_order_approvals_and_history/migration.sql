CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE "CustomerOrderApproval" (
    "id" UUID NOT NULL,
    "customerOrderId" UUID NOT NULL,
    "department" "Department" NOT NULL,
    "position" "Position" NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "decidedById" UUID,
    "decidedAt" TIMESTAMP(3),
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerOrderApproval_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "CustomerOrderHistory" (
    "id" UUID NOT NULL,
    "customerOrderId" UUID NOT NULL,
    "field" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "action" TEXT NOT NULL DEFAULT 'UPDATE',
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "changedById" UUID,
    "changedByName" TEXT,

    CONSTRAINT "CustomerOrderHistory_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CustomerOrderApproval_customerOrderId_department_position_key"
ON "CustomerOrderApproval"("customerOrderId", "department", "position");

CREATE INDEX "CustomerOrderApproval_decidedById_idx"
ON "CustomerOrderApproval"("decidedById");

CREATE INDEX "CustomerOrderHistory_customerOrderId_changedAt_idx"
ON "CustomerOrderHistory"("customerOrderId", "changedAt");

CREATE INDEX "CustomerOrderHistory_changedById_idx"
ON "CustomerOrderHistory"("changedById");

ALTER TABLE "CustomerOrderApproval"
ADD CONSTRAINT "CustomerOrderApproval_customerOrderId_fkey"
FOREIGN KEY ("customerOrderId") REFERENCES "CustomerOrder"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CustomerOrderApproval"
ADD CONSTRAINT "CustomerOrderApproval_decidedById_fkey"
FOREIGN KEY ("decidedById") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "CustomerOrderHistory"
ADD CONSTRAINT "CustomerOrderHistory_customerOrderId_fkey"
FOREIGN KEY ("customerOrderId") REFERENCES "CustomerOrder"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "CustomerOrderHistory"
ADD CONSTRAINT "CustomerOrderHistory_changedById_fkey"
FOREIGN KEY ("changedById") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

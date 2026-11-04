ALTER TABLE "UserHistory"
ADD COLUMN "userName" TEXT,
ADD COLUMN "action" TEXT NOT NULL DEFAULT 'EDIT',
ADD COLUMN "status" BOOLEAN;

UPDATE "UserHistory" AS history
SET
  "userName" = target."name",
  "status" = target."isActive"
FROM "User" AS target
WHERE history."userId" = target."id";

UPDATE "UserHistory"
SET "status" = true
WHERE "status" IS NULL;

ALTER TABLE "UserHistory"
ALTER COLUMN "status" SET DEFAULT true,
ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "changedBy" DROP NOT NULL;

ALTER TABLE "UserHistory"
DROP CONSTRAINT "UserHistory_userId_fkey",
ADD CONSTRAINT "UserHistory_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "UserHistory"
DROP CONSTRAINT "UserHistory_changedBy_fkey",
ADD CONSTRAINT "UserHistory_changedBy_fkey"
  FOREIGN KEY ("changedBy") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

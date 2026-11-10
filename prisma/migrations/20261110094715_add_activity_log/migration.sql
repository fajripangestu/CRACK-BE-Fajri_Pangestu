CREATE TABLE "activity_logs" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "action" TEXT NOT NULL,
    "module" TEXT,
    "description" TEXT,
    "entityType" TEXT,
    "entityId" INTEGER,
    "method" TEXT,
    "endpoint" TEXT,
    "referer" TEXT,
    "statusCode" INTEGER,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "deviceType" TEXT,
    "language" TEXT,
    "timezone" TEXT,
    "screenWidth" INTEGER,
    "screenHeight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "activity_logs_userId_idx"
ON "activity_logs"("userId");

CREATE INDEX "activity_logs_action_idx"
ON "activity_logs"("action");

CREATE INDEX "activity_logs_createdAt_idx"
ON "activity_logs"("createdAt");

ALTER TABLE "activity_logs"
ADD CONSTRAINT "activity_logs_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

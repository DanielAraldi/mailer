-- CreateTable
CREATE TABLE "Errors" (
    "id" TEXT NOT NULL,
    "stack" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Errors_pkey" PRIMARY KEY ("id")
);

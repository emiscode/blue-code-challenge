-- CreateTable
CREATE TABLE "Search" (
    "id" TEXT NOT NULL,
    "search" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

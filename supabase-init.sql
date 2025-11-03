-- CreateEnum
CREATE TYPE "FormationStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "PTFormation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "FormationStatus" NOT NULL DEFAULT 'PENDING',
    "companyName" TEXT NOT NULL,
    "businessActivities" TEXT NOT NULL,
    "companyAddress" TEXT NOT NULL,
    "registeredCapital" DOUBLE PRECISION NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "appointmentNotes" TEXT,
    "callId" TEXT,
    "callDuration" INTEGER,
    "recordingUrl" TEXT,
    "transcript" TEXT,
    "summaryDocument" TEXT,

    CONSTRAINT "PTFormation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shareholder" (
    "id" TEXT NOT NULL,
    "ptFormationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "sharePercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Shareholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" TEXT NOT NULL,
    "ptFormationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PTFormation_callId_key" ON "PTFormation"("callId");

-- CreateIndex
CREATE INDEX "PTFormation_status_idx" ON "PTFormation"("status");

-- CreateIndex
CREATE INDEX "PTFormation_createdAt_idx" ON "PTFormation"("createdAt");

-- CreateIndex
CREATE INDEX "Shareholder_ptFormationId_idx" ON "Shareholder"("ptFormationId");

-- CreateIndex
CREATE INDEX "Director_ptFormationId_idx" ON "Director"("ptFormationId");

-- AddForeignKey
ALTER TABLE "Shareholder" ADD CONSTRAINT "Shareholder_ptFormationId_fkey" FOREIGN KEY ("ptFormationId") REFERENCES "PTFormation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Director" ADD CONSTRAINT "Director_ptFormationId_fkey" FOREIGN KEY ("ptFormationId") REFERENCES "PTFormation"("id") ON DELETE CASCADE ON UPDATE CASCADE;


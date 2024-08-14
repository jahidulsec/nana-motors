/*
  Warnings:

  - You are about to drop the column `interestAmount` on the `Emi` table. All the data in the column will be lost.
  - You are about to drop the column `paymentReference` on the `Emi` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Emi` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" INTEGER NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "method" TEXT DEFAULT 'cash',
    "givenBy" TEXT,
    "refeneceNo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Emi_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Emi" ("createdAt", "givenBy", "id", "method", "paymentAmount", "paymentId", "refeneceNo", "updatedAt") SELECT "createdAt", "givenBy", "id", "method", "paymentAmount", "paymentId", "refeneceNo", "updatedAt" FROM "Emi";
DROP TABLE "Emi";
ALTER TABLE "new_Emi" RENAME TO "Emi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

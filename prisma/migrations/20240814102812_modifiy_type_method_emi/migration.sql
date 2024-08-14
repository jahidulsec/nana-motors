-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" INTEGER NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "method" TEXT NOT NULL DEFAULT 'cash',
    "givenBy" TEXT,
    "refeneceNo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Emi_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Emi" ("createdAt", "givenBy", "id", "method", "paymentAmount", "paymentId", "refeneceNo", "updatedAt") SELECT "createdAt", "givenBy", "id", coalesce("method", 'cash') AS "method", "paymentAmount", "paymentId", "refeneceNo", "updatedAt" FROM "Emi";
DROP TABLE "Emi";
ALTER TABLE "new_Emi" RENAME TO "Emi";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'emi',
    "emiNo" INTEGER,
    "interestRate" INTEGER,
    "emiDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "paidAmount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("createdAt", "customerId", "emiDate", "emiNo", "id", "interestRate", "paidAmount", "sellingPrice", "updatedAt", "vehicleId", "vehicleType") SELECT "createdAt", "customerId", "emiDate", "emiNo", "id", "interestRate", "paidAmount", "sellingPrice", "updatedAt", "vehicleId", "vehicleType" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

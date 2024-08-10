-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "spouseName" TEXT,
    "nid" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "houseName" TEXT,
    "village" TEXT,
    "postOffice" TEXT,
    "upazilla" TEXT,
    "district" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("createdAt", "district", "fatherName", "houseName", "id", "mobile", "motherName", "name", "nid", "postOffice", "spouseName", "upazilla", "updatedAt", "village") SELECT "createdAt", "district", "fatherName", "houseName", "id", "mobile", "motherName", "name", "nid", "postOffice", "spouseName", "upazilla", "updatedAt", "village" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_nid_key" ON "Customer"("nid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "fatherName" TEXT,
    "motherName" TEXT,
    "spouseName" TEXT,
    "nid" TEXT NOT NULL,
    "mobile" INTEGER NOT NULL,
    "houseName" TEXT,
    "village" TEXT,
    "postOffice" TEXT,
    "upazilla" TEXT,
    "district" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "engineNo" TEXT NOT NULL,
    "carCondition" TEXT DEFAULT 'new',
    "sellerType" TEXT DEFAULT 'company',
    "sellerName" TEXT,
    "sellerContact" INTEGER,
    "sellerAddress" TEXT,
    "purchasePrice" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL DEFAULT 'emi',
    "emiNo" INTEGER NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "emiDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAmount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Payment_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Payment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentId" INTEGER NOT NULL,
    "paymentAmount" INTEGER NOT NULL,
    "interestAmount" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "paymentReference" TEXT NOT NULL,
    "givenBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Emi_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_nid_key" ON "Customer"("nid");

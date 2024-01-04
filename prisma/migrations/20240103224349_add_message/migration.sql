/*
  Warnings:

  - Added the required column `message` to the `Mail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "from" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Mail" ("createdAt", "from", "id", "login", "password", "title", "username") SELECT "createdAt", "from", "id", "login", "password", "title", "username" FROM "Mail";
DROP TABLE "Mail";
ALTER TABLE "new_Mail" RENAME TO "Mail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

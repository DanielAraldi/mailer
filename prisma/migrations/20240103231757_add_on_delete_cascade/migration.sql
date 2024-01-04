-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_To" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "mailId" TEXT NOT NULL,
    CONSTRAINT "To_mailId_fkey" FOREIGN KEY ("mailId") REFERENCES "Mail" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_To" ("email", "id", "mailId") SELECT "email", "id", "mailId" FROM "To";
DROP TABLE "To";
ALTER TABLE "new_To" RENAME TO "To";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

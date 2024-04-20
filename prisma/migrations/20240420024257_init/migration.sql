-- CreateTable
CREATE TABLE "Event" (
    "eventID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "imageURL" VARCHAR(255) NOT NULL,
    "title" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "Group" (
    "groupID" SERIAL NOT NULL,
    "eventID" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupID")
);

-- CreateTable
CREATE TABLE "_memberOfGroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_recommendedGroups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_memberOfGroups_AB_unique" ON "_memberOfGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_memberOfGroups_B_index" ON "_memberOfGroups"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_recommendedGroups_AB_unique" ON "_recommendedGroups"("A", "B");

-- CreateIndex
CREATE INDEX "_recommendedGroups_B_index" ON "_recommendedGroups"("B");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("eventID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_memberOfGroups" ADD CONSTRAINT "_memberOfGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("groupID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_memberOfGroups" ADD CONSTRAINT "_memberOfGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recommendedGroups" ADD CONSTRAINT "_recommendedGroups_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("groupID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_recommendedGroups" ADD CONSTRAINT "_recommendedGroups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

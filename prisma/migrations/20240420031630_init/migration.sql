-- AlterTable
CREATE SEQUENCE event_eventid_seq;
ALTER TABLE "Event" ALTER COLUMN "eventID" SET DEFAULT nextval('event_eventid_seq');
ALTER SEQUENCE event_eventid_seq OWNED BY "Event"."eventID";

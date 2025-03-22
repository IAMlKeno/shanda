/* Create types (enums) */
CREATE TYPE USER_STATUS as enum ('active', 'pending', 'inactive');
CREATE TYPE JOB_STATUS as enum ('pending', 'in_progress', 'complete');
CREATE TYPE PAYMENT_STATUS as enum ('unpaid', 'paid', 'partially_paid');

CREATE TABLE IF NOT EXISTS "contactInformation" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"firstName" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL UNIQUE,
	"created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"deleted" timestamp,
	"status" USER_STATUS NOT NULL DEFAULT 'pending',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ratings" (
  "id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  "rating" DECIMAL(2, 1) NOT NULL,
  "referenceId" uuid NOT NULL, -- THE ENTITY THAT THIS RATING IS FOR
	"created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"modified" timestamp NOT NULL,
  "createdBy" uuid NOT NULL,
  "note" TEXT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "serviceProvider" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"companyId" uuid,
	"contactInfoId" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "requester" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"userId" uuid NOT NULL,
	"contactInfoId" uuid NOT NULL,
	"garageId" uuid,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "companyInformation" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"companyName" varchar(255) NOT NULL,
	"contactInformation" uuid NOT NULL,
	"binNumber" varchar(255) NOT NULL, -- business number
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "vehicleGarage" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"vehicles" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "request" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"summary" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"vehicleId" uuid NOT NULL,
	"requesterId" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "bid" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"bidderId" uuid NOT NULL,
	"revisionId" uuid NOT NULL,
	"requestId" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "bidRevision" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"amount" uuid NOT NULL,
	"details" varchar(255) NOT NULL,
	"created" timestamp NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "vehicle" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"vin" varchar(17) NOT NULL,
	"vehicleInformation" jsonb NOT NULL,
	"vehicleLog" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "maintenanceLog" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"details" jsonb NOT NULL DEFAULT {},
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "receipt" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"transactionNumber" varchar(255) NOT NULL,
	"created" date NOT NULL,
	"datePaid" date NOT NULL,
	"bookingId" uuid NOT NULL,
	"paymentStatus" PAYMENT_STATUS NOT NULL DEFAULT 'unpaid',
	"requesterId" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "job" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  "created" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"providerId" uuid NOT NULL,
	"bookingId" uuid NOT NULL,
	"status" JOB_STATUS NOT NULL DEFAULT 'pending',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "booking" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"created" timestamp NOT NULL,
	"acceptedDate" timestamp,
	"completionDate" timestamp,
	"notes" varchar(255),
	"requestId" uuid NOT NULL,
	"winningBidId" uuid,
	"expectedCompletionDate" date NOT NULL,
	"garageId" uuid,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "garage" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"nickname" varchar(255) NOT NULL,
	"location" jsonb NOT NULL,
	"ownerId" uuid NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "garageOwner" (
	"id" uuid NOT NULL UNIQUE DEFAULT gen_random_uuid(),
	"user" uuid,
	"garage" uuid NOT NULL,
	PRIMARY KEY ("id")
);



ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_fk1" FOREIGN KEY ("userId") REFERENCES "user"("id");

ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_fk2" FOREIGN KEY ("companyId") REFERENCES "companyInformation"("id");

ALTER TABLE "serviceProvider" ADD CONSTRAINT "serviceProvider_fk3" FOREIGN KEY ("contactInfoId") REFERENCES "contactInformation"("id");
ALTER TABLE "requester" ADD CONSTRAINT "requester_fk1" FOREIGN KEY ("userId") REFERENCES "user"("id");

ALTER TABLE "requester" ADD CONSTRAINT "requester_fk2" FOREIGN KEY ("contactInfoId") REFERENCES "contactInformation"("id");

ALTER TABLE "requester" ADD CONSTRAINT "requester_fk3" FOREIGN KEY ("garageId") REFERENCES "vehicleGarage"("id");
ALTER TABLE "companyInformation" ADD CONSTRAINT "companyInformation_fk2" FOREIGN KEY ("contactInformation") REFERENCES "contactInformation"("id");
ALTER TABLE "vehicleGarage" ADD CONSTRAINT "vehicleGarage_fk1" FOREIGN KEY ("vehicles") REFERENCES "vehicle"("id");
ALTER TABLE "request" ADD CONSTRAINT "request_fk4" FOREIGN KEY ("requesterId") REFERENCES "requester"("id");
ALTER TABLE "bid" ADD CONSTRAINT "bid_fk1" FOREIGN KEY ("bidderId") REFERENCES "serviceProvider"("id");

ALTER TABLE "bid" ADD CONSTRAINT "bid_fk2" FOREIGN KEY ("revisionId") REFERENCES "bidRevision"("id");

ALTER TABLE "bid" ADD CONSTRAINT "bid_fk3" FOREIGN KEY ("requestId") REFERENCES "request"("id");

ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_fk3" FOREIGN KEY ("vehicleLog") REFERENCES "maintenanceLog"("id");

ALTER TABLE "receipt" ADD CONSTRAINT "receipt_fk4" FOREIGN KEY ("bookingId") REFERENCES "booking"("id");

ALTER TABLE "receipt" ADD CONSTRAINT "receipt_fk6" FOREIGN KEY ("requesterId") REFERENCES "requester"("id");
ALTER TABLE "job" ADD CONSTRAINT "job_fk1" FOREIGN KEY ("providerId") REFERENCES "serviceProvider"("id");

ALTER TABLE "job" ADD CONSTRAINT "job_fk2" FOREIGN KEY ("bookingId") REFERENCES "booking"("id");
ALTER TABLE "booking" ADD CONSTRAINT "booking_fk5" FOREIGN KEY ("requestId") REFERENCES "request"("id");

ALTER TABLE "booking" ADD CONSTRAINT "booking_fk6" FOREIGN KEY ("winningBidId") REFERENCES "bid"("id");

ALTER TABLE "booking" ADD CONSTRAINT "booking_fk8" FOREIGN KEY ("garageId") REFERENCES "garage"("id");
ALTER TABLE "garage" ADD CONSTRAINT "garage_fk3" FOREIGN KEY ("ownerId") REFERENCES "garageOwner"("id");
ALTER TABLE "garageOwner" ADD CONSTRAINT "garageOwner_fk1" FOREIGN KEY ("user") REFERENCES "user"("id");

ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_fk" FOREIGN KEY ("createdBy") REFERENCES "user"("id");


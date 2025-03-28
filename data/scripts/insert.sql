-- Insert test data for "user"
INSERT INTO public."user" ("id", "firstName", "lastName", "username", "status") VALUES
('00000000-0000-0000-0000-000000000001', 'John', 'Doe', 'johndoe', 'active'),
('00000000-0000-0000-0000-000000000002', 'Jane', 'Smith', 'janesmith', 'pending'), --
('00000000-0000-0000-0000-000000000003', 'David', 'Lee', 'davidlee', 'inactive'),
('00000000-0000-0000-0000-a00000000001', 'Test', 'User1', 'requester1', 'active'), -- requester
('00000000-0000-0000-0000-a00000000002', 'Test', 'User2', 'requester2', 'active'), -- requester
('00000000-0000-0000-0000-a00000000003', 'Test', 'User3', 'provider1', 'active'), -- provider
('00000000-0000-0000-0000-a00000000004', 'Test', 'User4', 'provider2', 'active'), -- provider
('00000000-0000-0000-0000-a00000000005', 'Test', 'User5', 'provider3', 'active'), -- provider - business
('00000000-0000-0000-0000-a00000000006', 'Test', 'User6', 'garageOwner', 'active'); -- garageOnwer

-- Insert test data for "contactInformation"
INSERT INTO public."contactInformation" ("id", "phone", "email") VALUES
('00000000-0000-0000-0000-000000000011', '555-123-4567', 'johndoe@example.com'),
('00000000-0000-0000-0000-000000000012', '555-987-6543', 'janesmith@example.com'),
('00000000-0000-0000-0000-000000000013', '555-555-5555', 'davidlee@example.com'),
('00000000-0000-0000-0000-b00000000011', '555-555-5556', 'requester1@example.com'),
('00000000-0000-0000-0000-b00000000012', '555-555-5557', 'requester2@example.com'),
('00000000-0000-0000-0000-b00000000013', '555-555-5558', 'provider1@example.com'),
('00000000-0000-0000-0000-b00000000014', '555-555-5550', 'provider2@example.com'),
('00000000-0000-0000-0000-b00000000015', '555-555-5561', 'provider3@example.com'),
('00000000-0000-0000-0000-b00000000016', '555-555-5562', 'garageOwner1@example.com');

-- Insert test data for "companyInformation"
INSERT INTO public."companyInformation" ("id", "companyName", "contactInformation", "binNumber") VALUES
('00000000-0000-0000-0000-000000000021', 'Acme Repair', '00000000-0000-0000-0000-b00000000015', '123456789');

-- Insert test data for "serviceProvider"
INSERT INTO public."serviceProvider" ("id", "userId", "companyId", "contactInfoId") VALUES
(
  '00000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-a00000000005',
  '00000000-0000-0000-0000-000000000021',
  '00000000-0000-0000-0000-000000000011'), -- business (00000000-0000-0000-0000-a00000000005)
('00000000-0000-0000-0000-c00000000031', '00000000-0000-0000-0000-a00000000003', NULL, '00000000-0000-0000-0000-b00000000013'), -- 
('00000000-0000-0000-0000-c00000000032', '00000000-0000-0000-0000-a00000000004', NULL, '00000000-0000-0000-0000-b00000000014'); -- 


-- Insert test data for "garageOwner"
INSERT INTO public."garageOwner" ("id", "user", "garage", "contactInfo") VALUES
('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-a00000000006', '00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-b00000000016');

-- Insert test data for "garage"
INSERT INTO public."garage" ("id", "nickname", "location", "ownerId") VALUES
('00000000-0000-0000-0000-000000000041', 'My Garage', '{"address": "123 Main St"}', '00000000-0000-0000-0000-000000000051');

-- Insert test data for "vehicleGarage"
INSERT INTO public."vehicleGarage" ("id") VALUES
('20354d7a-e4fe-47af-8ff6-187bca92f3f9'),
('bd2cbad1-6ccf-48e3-bb92-bc9961bc011e');

-- Insert test data for "requester"
INSERT INTO public."requester" ("id", "userId", "contactInfoId", "garageId") VALUES
('00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000012', NULL),
('00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-a00000000001', '00000000-0000-0000-0000-b00000000011', '20354d7a-e4fe-47af-8ff6-187bca92f3f9'),
('00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-a00000000002', '00000000-0000-0000-0000-b00000000012', 'bd2cbad1-6ccf-48e3-bb92-bc9961bc011e');

-- Insert test data for "maintenanceLog"
INSERT INTO public."maintenanceLog" ("id") VALUES
('3ca13312-6ecc-4152-bbe8-c8fc1b3cd838'),
('51f59d65-39a7-404e-aced-2d92d7f1545a');

-- Insert test data for "vehicles"
INSERT INTO public."vehicle" ("id", "vin", "garageId", "vehicleInformation", "vehicleLog") VALUES
('b5e2cf01-8bb6-4fcd-ad88-0efb611195da', '70YZ0XYGZ5H9ACXOK', '20354d7a-e4fe-47af-8ff6-187bca92f3f9', '{"make": "Honda", "model": "Accord", "trim": "LX", "year": "2022", "mileage": 100000, "color": "Black"}', '3ca13312-6ecc-4152-bbe8-c8fc1b3cd838'),
('b11c9be1-b619-4ef5-be1b-a1cd9ef265b7', 'WB6MASLNU96PHNHLG', 'bd2cbad1-6ccf-48e3-bb92-bc9961bc011e', '{"make": "Toyota", "model": "Corolla", "trim": "CE", "year": "2014", "mileage": 204000, "color": "White"}', '51f59d65-39a7-404e-aced-2d92d7f1545a');

-- Insert more test data as needed for other tables 
-- Following the same pattern and ensuring foreign key constraints are met.
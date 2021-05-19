CREATE DATABASE surgerymgmt;

CREATE TABLE staff (id INT PRIMARY KEY AUTO_INCREMENT,
	staffType VARCHAR(12) NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    phone VARCHAR(10),
    email VARCHAR(255) NOT NULL);
    
CREATE TABLE room (id INT PRIMARY KEY AUTO_INCREMENT,
	roomName VARCHAR(255) NOT NULL);
    
CREATE TABLE patient (id INT PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    dob DATETIME NOT NULL,
    contactNumber VARCHAR(10) NOT NULL,
    email VARCHAR(255));

CREATE TABLE surgery (id INT PRIMARY KEY AUTO_INCREMENT,
    requestedBy INT NOT NULL,
    room INT NOT NULL,
    patient INT NOT NULL,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    docAssigned varchar(255) NOT NULL);

CREATE TABLE doc_in_surgery (surgeryId INT ,
	doctorId INT);
    
CREATE TABLE users ( userid VARCHAR(255) PRIMARY KEY,
password VARCHAR(255),
staffId INT
);

CREATE TABLE sessionToken (id VARCHAR(20) PRIMARY KEY,
	userid VARCHAR(255) NOT NULL,
    staffType VARCHAR(12) NOT NULL,
    expires VARCHAR(13) NOT NULL);
/* Inserting startup data */

INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Doctor','Mary','Brown','8765551234','mary_brown@speurgroup.com');
INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Doctor','Albert','Stewart','876555876','albert_stewart@speurgroup.com');
INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Doctor','Jules','Plummer','876555876','jules_plummer@speurgroup.com');
INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Receptionist','Alice','Cullen','8765554562','alice_cullen@speurgroup.com');
INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Receptionist','John','Brand','8765551674','john_brand@speurgroup.com');
INSERT INTO staff (staffType,fname,lname,phone,email) VALUES ('Admin','Admin','Admin','8765552589','admin@speurgroup.com');

INSERT INTO room (roomName) VALUES ('Operating Room1');
INSERT INTO room (roomName) VALUES ('Operating Room2');
INSERT INTO room (roomName) VALUES ('Operating Room3');
INSERT INTO room (roomName) VALUES ('Operating Room4');
INSERT INTO room (roomName) VALUES ('Operating Room5');

INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('John','Sandford','1964-04-23','8769876452','jsanford@thismail.com');
INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('Lucas','Davenport','1943-05-02','8763459872','davenl43@onemail.com');
INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('Sandra','Brown','1989-11-21','8769823456','plumpy@othermail.com');
INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('Erin','Clarke','1976-01-01','8766509234','clarke_erin@ohmail.com');
INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('Lionelle','Rah','1999-11-18','8766359172','rahlion@thismail.com');
INSERT INTO patient (fname,lname,dob,contactNumber,email) VALUES ('Lily','Freebird','1988-08-23','8765364756','lilyfree@amail.com');

INSERT INTO users (userid,password,staffId) VALUES ('admin@speurgroup.com','a4c66e74c4e5db0e5e25a6cc49078b3372a4db292f023c587fd1adec8a450613','6');





    
 
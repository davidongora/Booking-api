-- Create Users Table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    Role ENUM('Client', 'Faculty', 'Administrator'),
    ContactInformation TEXT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Profiles Table
CREATE TABLE Profiles (
    ProfileID INT AUTO_INCREMENT PRIMARY KEY,
    UserID INT,
    AcademicQualifications TEXT,
    AreasOfExpertise TEXT,
    Availability TEXT,
    ContactInformation TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create ConsultancyRequests Table
CREATE TABLE ConsultancyRequests (
    RequestID INT AUTO_INCREMENT PRIMARY KEY,
    ClientID INT,
    FacultyID INT,
    Topic VARCHAR(255),
    Description TEXT,
    PreferredDates TEXT,
    Status ENUM('Pending', 'Accepted', 'Declined') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ClientID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (FacultyID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Appointments Table
CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    RequestID INT,
    Date DATE,
    Time TIME,
    Status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (RequestID) REFERENCES ConsultancyRequests(RequestID) ON DELETE CASCADE
);

-- Create Payments Table
CREATE TABLE Payments (
    PaymentID INT AUTO_INCREMENT PRIMARY KEY,
    AppointmentID INT,
    Amount DECIMAL(10, 2),
    PaymentMethod VARCHAR(50),
    PaymentDate DATE,
    Status ENUM('Pending', 'Completed', 'Failed') DEFAULT 'Pending',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AppointmentID) REFERENCES Appointments(AppointmentID) ON DELETE CASCADE
);

-- Create Messages Table
CREATE TABLE Messages (
    MessageID INT AUTO_INCREMENT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    Content TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (SenderID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ReceiverID) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Create Reports Table
CREATE TABLE Reports (
    ReportID INT AUTO_INCREMENT PRIMARY KEY,
    GeneratedBy INT,
    ReportType VARCHAR(100),
    Content TEXT,
    GeneratedDate DATE,
    FOREIGN KEY (GeneratedBy) REFERENCES Users(UserID) ON DELETE CASCADE
);

-- Additional indices for faster queries
CREATE INDEX idx_email ON Users(Email);
CREATE INDEX idx_role ON Users(Role);
CREATE INDEX idx_request_status ON ConsultancyRequests(Status);
CREATE INDEX idx_appointment_status ON Appointments(Status);

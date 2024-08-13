const express = require('express');
const connectToDatabase = require('../db'); // Import the function directly
const router = express.Router();

// Schedule Appointment (Faculty/Client)
const scheduleAppointment = async (req, res) => {
    const { requestId, date, time } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'INSERT INTO Appointments (RequestID, Date, Time) VALUES (@requestId, @date, @time)',
            {
                requestId,
                date,
                time
            }
        );
        res.status(201).json({ message: 'Appointment scheduled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Appointment scheduling failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// View All Appointments (Faculty/Client)
const allAppointments = async (req, res) => {
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        const result = await request.query('SELECT * FROM Appointments');
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: 'Fetching appointments failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    scheduleAppointment,
    allAppointments
};

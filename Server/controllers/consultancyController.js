const express = require('express');
const connectToDatabase = require('../db'); // Import the function directly

const router = express.Router();

// Submit Consultancy Request (Client)
const requestConsultancy = async (req, res) => {
    const { clientId, facultyId, topic, description, preferredDates } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'INSERT INTO ConsultancyRequests (ClientID, FacultyID, Topic, Description, PreferredDates) VALUES (@clientId, @facultyId, @topic, @description, @preferredDates)',
            {
                clientId,
                facultyId,
                topic,
                description,
                preferredDates
            }
        );
        res.status(201).json({ message: 'Request submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Request submission failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// Accept or Decline Consultancy Request (Faculty)
const actionRequest = async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'UPDATE ConsultancyRequests SET Status = @status WHERE RequestID = @requestId',
            {
                status,
                requestId
            }
        );
        res.json({ message: 'Request updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Request update failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    requestConsultancy,
    actionRequest
};

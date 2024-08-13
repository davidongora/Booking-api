const express = require('express');
const connectToDatabase = require('../db'); // Import the function directly
const router = express.Router();

// Make Payment (Client)
const makePayment = async (req, res) => {
    const { appointmentId, amount, paymentMethod, paymentDate } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'INSERT INTO Payments (AppointmentID, Amount, PaymentMethod, PaymentDate) VALUES (@appointmentId, @amount, @paymentMethod, @paymentDate)',
            {
                appointmentId,
                amount,
                paymentMethod,
                paymentDate
            }
        );
        res.status(201).json({ message: 'Payment processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Payment processing failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// View All Payments (Admin)
const allPayments = async (req, res) => {
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        const result = await request.query('SELECT * FROM Payments');
        res.json(result.recordset); // Use `recordset` to get the result rows
    } catch (error) {
        res.status(500).json({ error: 'Fetching payments failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    makePayment,
    allPayments
};

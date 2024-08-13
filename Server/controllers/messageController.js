const express = require('express');
const connectToDatabase = require('../db'); // Import the function directly

// Send Message (Client/Faculty)
const sendMessage = async (req, res) => {
    const { senderId, receiverId, content } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'INSERT INTO Messages (SenderID, ReceiverID, Content) VALUES (@senderId, @receiverId, @content)',
            {
                senderId,
                receiverId,
                content
            }
        );
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Message sending failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// View Messages Between Users (Client/Faculty)
const messagesBetween = async (req, res) => {
    const { userId } = req.params;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        const result = await request.query(
            'SELECT * FROM Messages WHERE SenderID = @userId OR ReceiverID = @userId',
            { userId }
        );
        res.json(result.recordset); // Use `recordset` to get the result rows
    } catch (error) {
        res.status(500).json({ error: 'Fetching messages failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    sendMessage,
    messagesBetween
};

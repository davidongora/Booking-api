const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db'); // Import the function directly

// Register
const register = async (req, res) => {
    const { name, email, password, role, contactInformation } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        await request.query(
            'INSERT INTO Users (Name, Email, Password, Role, ContactInformation) VALUES (@name, @email, @hashedPassword, @role, @contactInformation)',
            {
                name,
                email,
                hashedPassword,
                role,
                contactInformation
            }
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        const result = await request.query(
            'SELECT * FROM Users WHERE Email = @email',
            { email }
        );
        const user = result.recordset;
        if (user.length && await bcrypt.compare(password, user[0].Password)) {
            const token = jwt.sign({ userId: user[0].UserID, role: user[0].Role }, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    login,
    register
};

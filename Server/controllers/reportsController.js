const connectToDatabase = require('../db'); // Import the function directly

// Generate Report (Admin)
const generateReport = async (req, res) => {
    const { generatedBy, reportType, content, generatedDate } = req.body;
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        // Use named parameters for MSSQL
        await request.query(
            'INSERT INTO Reports (GeneratedBy, ReportType, Content, GeneratedDate) VALUES (@generatedBy, @reportType, @content, @generatedDate)',
            {
                generatedBy,
                reportType,
                content,
                generatedDate
            }
        );
        res.status(201).json({ message: 'Report generated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Report generation failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

// View All Reports (Admin)
const allReports = async (req, res) => {
    try {
        const pool = await connectToDatabase(); // Call the function to get the pool
        const request = pool.request();
        const result = await request.query('SELECT * FROM Reports');
        res.json(result.recordset); // Use `recordset` to get the result rows
    } catch (error) {
        res.status(500).json({ error: 'Fetching reports failed', err: error });
        console.log(error); // Log the error for debugging
    }
};

module.exports = {
    generateReport,
    allReports
};

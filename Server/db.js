const { ConnectionPool } = require('mssql');

const config = {
    user: 'azureuser',
    password: '#Dave9625',
    server: 'mysqlserverke.database.windows.net',
    port: 1433,
    database: 'booking_appointment',
    options: {
        encrypt: true, // Enable encryption for secure connection
    }
};

let pool;

async function connectToDatabase() {
    if (!pool) {
        try {
            pool = new ConnectionPool(config);
            await pool.connect();
            console.log('Connected to SQL Server!');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }
    return pool;
}

module.exports = connectToDatabase;

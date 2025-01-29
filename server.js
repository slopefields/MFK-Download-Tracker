const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const dbPath = './modmetrics.db';

// Connect to modmetrics.db
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, err =>
{
    if (err)
        console.error("Failed to connect to modmetrics.db", err.message);
    else   
        console.log("Successfully connected to modmetrics.db");
});

// Enable CORS, cross-origin resource sharing
app.use(cors());

// Serve static files from the 'static' folder
app.use(express.static(path.join(__dirname, 'static')));

app.get('/data', (req, res) => {
    // Destructure query parameters from request
    const { start_date, end_date } = req.query;

    // Ensure both start date and end date are valid
    if (!start_date && !end_date)
        return res.status(400).json({error : 'Start date and end date both required.'});

    const query = 'SELECT date, downloads FROM metrics WHERE date BETWEEN ? and ? ORDER BY date ASC';

    db.all(query, [start_date, end_date], (err, rows) =>
    {
        if (err)
            return res.status(500).json({error : 'Error querying database: ' + err.message});
        // Get rows as a json
        res.json(rows);
    });
});

// Start server
app.listen(port, () =>
{
    console.log(`Server running with port ${port}`);
});
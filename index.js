const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.join('/data', 'modmetrics.db');

const metricsDB = new sqlite3.Database(dbPath, (err) => {
    if (err) 
        console.error('Error connecting to database: ', err.message);
    else
        console.log('Connected to database successfully.');
});

app.get('/metrics', (req,res) => {
    const query = 'SELECT * FROM metrics';
    metricsDB.all(query, [], (err, rows) => {
        if (err)
            res.status(500).send(err.message);
        else
            res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
});
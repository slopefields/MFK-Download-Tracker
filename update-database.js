const sqlite3 = require('sqlite3');
const fs = require('fs');

const dbPath = './modmetrics.db';
const dataPath = './data.json';

// Using sync so that it waits to fully read before continuing
const jsonData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const database = new sqlite3.Database(dbPath, err => {
    if (err) 
        console.error('Error connecting to modmetrics database: ', err.message);
    else
        console.log('Successfully connected to modmetrics database.');
});

database.serialize(() =>
{
    const insertQuery = 'INSERT OR IGNORE INTO metrics (year, month, day, downloads, rating_score, latest_version) VALUES (?, ?, ?, ?, ?, ?)';
    
    jsonData.forEach((entry) =>
    {
        // Object destructuring: basically the same as const year = entry.year, const downloads = entry.downloads, etc.
        const { year, month, day, downloads, rating_score, latest_version } = entry;
        database.run(insertQuery, [year, month, day, downloads, rating_score, latest_version], err =>
        {
            if (err)
                console.error('Error inserting data', err.message);
        });
    });
});

database.close(() =>
{
    console.log('Database updated and closed.');
});

const sqlite3 = require('sqlite3');
const fs = require('fs');

const dbPath = './modmetrics.db';
const dataPath = './data.json';

// Using sync so that it waits to fully read before continuing
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Connect to modmetrics.db
const database = new sqlite3.Database(dbPath, err => {
    if (err) 
        console.error('Error connecting to modmetrics database: ', err.message);
    else
        console.log('Successfully connected to modmetrics database.');
});

// Get current date
const currentDate = new Date();
const year = currentDate.getFullYear(); 
const month = currentDate.getMonth() + 1; // Adding 1 because zero-indexed (Jan = 0, Sep = 8, etc.)
const day = currentDate.getDate(); // getDay returns day of the week (like Monday) while getDate returns day of month (like 23)

// Object destructuring: basically the same as const year = jsonData.year, const downloads = jsonData.downloads, etc.
const { downloads, rating_score, latest_version } = jsonData;

// Using serialize so that each step finishes before the next
database.serialize(() =>
{
    const insertQuery = 'INSERT OR IGNORE INTO metrics (year, month, day, downloads, rating_score, latest_version) VALUES (?, ?, ?, ?, ?, ?)';
    
    // Take (year, month, day) from earlier, and (downloads, rating_score, and latest_version) from deconstruction.
    // run() used for non-returning queries
    database.run(insertQuery, [year, month, day, downloads, rating_score, latest_version], err =>
    {
        if (err)
            console.error('Error inserting data', err.message);
    });
});

database.close(() =>
{
    console.log('Database updated and closed.');
});

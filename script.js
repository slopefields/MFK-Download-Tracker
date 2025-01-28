// Open connection to modmetrics.db
const sqlite3 = require('sqlite3');
const dbPath = './modmetrics.db';
const database = new sqlite3.Database(dbPath, data =>
{
    if (err) 
        console.error('Error connecting to modmetrics database in script.js', err.message);
    else
        console.log('Successfully connected to modmetrics database in script.js.');
});

// Sorts rows by date in descending order, restricts to first two rows, and retrieves values for "downloads"
const query = 'SELECT downloads FROM metrics ORDER BY year DESC, month DESC, day DESC LIMIT 2';

// Query database
database.all(query, (err, rows) =>
{
    if (err)
        console.error("Error querying database: ", err.message);
    else if (rows.length == 2)
    {
        const [today, yesterday] = rows;
        const difference = today.downloads - yesterday.downloads;
    }
});

// Retrieve data.json file
fetch('./data.json')
        // Handle HTTP-level errors like 404 Not Found or 500 Server Error
        .then(response => 
        {
            if(!response.ok)
                throw new Error(`Error with response: ${response.status}`);
            return response.json();
        })
        .then (data =>
        {
            const downloadsElement = document.getElementById('downloads');
            downloadsElement.textContent = `Total Downloads: ${data.downloads}`;
            
            // Make text + or - based on increase or decrease
            const differenceText = difference >= 0 ? ` (+${difference} compared to yesterday)` : ` (-${difference} compared to yesterday)`;
            const tempDifference = document.createElement('difference');
            tempDifference.textContent = differenceText;
            //  Change color based on increase or decrease
            tempDifference.style.color = difference >= 0 ? 'green' : 'red';
            
            // Append colored text to the rest of text (Total Downloads: ...)
            downloadsElement.appendChild(tempDifference);
        })
        // Final safety net
        .catch(error => 
        {
            console.error('Error fetching data:', error);
            document.getElementById('downloads').textContent = 'Error fetching download data.'
        });
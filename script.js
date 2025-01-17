const sqlite3 = require('sqlite3');
const dbPath = './modmetrics.db';
const database = new sqlite3.Database(dbPath, data =>
{
    if (err) 
        console.error('Error connecting to modmetrics database in script.js', err.message);
    else
        console.log('Successfully connected to modmetrics database in script.js.');
});

fetch('./data.json')
        .then(response => 
        {
            if(!response.ok)
                throw new Error(`Error with response: ${response.status}`);
            return response.json();
        })
        .then (data =>
        {
            const difference = 3;

            const downloadsElement = document.getElementById('downloads');
            downloadsElement.textContent = `Total Downloads: ${data.downloads}`;
            
            const differenceText = difference >= 0 ? ` (+${difference} compared to yesterday)` : ` (-${difference} compared to yesterday)`;
            const tempDifference = document.createElement('difference');
            tempDifference.textContent = differenceText;
            tempDifference.style.color = difference >= 0 ? 'green' : 'red';
            
            downloadsElement.appendChild(tempDifference);
        })
        .catch(error => 
        {
            console.error('Error fetching data:', error);
            document.getElementById('downloads').textContent = 'Error fetching download data.'
        });
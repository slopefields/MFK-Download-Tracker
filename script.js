// Fetch data from backend API
fetch('https://thunderstoreanalytics.onrender.com/data')
    .then(response =>
    {
        // Handle HTTP errors
        if(!response.ok)
            throw new Error(`Error with response: ${response.status}`);
        return response.json();
    })
    .then(data =>
    {
        const totalDownloadElement = document.getElementById('downloads-total');
        const rangedDownloadElement = document.getElementById('downloads-ranged');
    })
    // Handle network errors
    .catch(error => 
    {
        console.error('Error fetching data:', error);
        document.getElementById('downloads').textContent = 'Error fetching download data.'
    });
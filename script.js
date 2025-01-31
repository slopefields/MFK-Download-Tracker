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

    })
    // Handle network errors
    .catch(error => 
    {
        console.error('Error fetching data:', error);
        document.getElementById('downloads').textContent = 'Error fetching download data.'
    });
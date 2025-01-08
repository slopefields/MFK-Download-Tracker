fetch('./data.json')
        .then(response => 
        {
            if(!response.ok)
                throw new Error('Error with response: ${response.status}');
            return response.json();
        })
        .then (data =>
        {
            document.getElementById('downloads').textContent = 'Total Downloads: ${data.downloads}';
        })
        .catch(error => 
        {
            console.error('Error fetching data:', error);
            document.getElementById('downloads').textContent = 'Error fetching download data.'
        });
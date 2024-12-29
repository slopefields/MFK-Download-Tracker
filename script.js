fetch('https://thunderstore.io/api/v1/package-metrics/Plotection/MoneyForKills')
        .then(response => 
        {
            if(!response.ok)
                throw new Error('Error with response: ${response.status}');
            console.log('Response successful:', response);
            return response.json();
        })
        .then (data =>
        {
            const downloadCount = data.downloads;
            document.getElementById('downloads').textContent = 'Total Downloads: ${downloadCount}';
        })
        .catch(error => 
        {
            console.error('Error fetching data:', error);
            document.getElementById('downloads').textContent = 'Error fetching download data.'
        });
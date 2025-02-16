let startDate, endDate;

const totalDownloadElement = document.getElementById('downloads-total');
const rangedDownloadElement = document.getElementById('downloads-ranged');

const formStartDate = document.getElementById('form-start-date');
const formEndDate = document.getElementById('form-end-date');
const dropdownSelection = document.getElementById('date-range-dropdown');
const formButton = document.getElementById('confirm-form-button');

const statusElement = document.getElementById('server-status');

dropdownSelection.addEventListener('change', function()
{
    
});

formButton.addEventListener('click', function(){
    if (!formStartDate.value || !formEndDate.value)
        alert('Enter both a start and end date!');
    else
    {
        startDate = formStartDate.value;
        endDate = formEndDate.value;

        fetchData();
    }
});

// Fetch data from backend API after startDate and endDate have values
function fetchData()
{
    fetch(`https://thunderstoreanalytics.onrender.com/data?start_date=${startDate}&end_date=${endDate}`)
    .then(response =>
    {
        // Handle HTTP errors
        if(!response.ok)
            throw new Error(`Error with response: ${response.status}`);
        return response.json();
    })
    .then(data =>
    {
        if (data.length == 0)
        {
            rangedDownloadElement.textContent = 'No data available';
            return;
        }
        else if (data.length == 1)
        {
            rangedDownloadElement.textContent = `Downloads for selected date: ${data[0].downloads}`;
        }
        else
        {
            let latestDataFromRange = data[data.length - 1];
            let firstDataFromRange = data[0];

            totalDownloadElement.textContent = `Total downloads at this time: ${latestDataFromRange.downloads}`;
            rangedDownloadElement.textContent = `Downloads gained during this period: ${latestDataFromRange.downloads - firstDataFromRange.downloads}`;
        }
        // Call updateChart from downloads-chart.js
        window.updateChart(data);
    })
    // Handle network errors
    .catch(error => 
    {
        console.error('Error fetching data:', error);
        rangedDownloadElement.textContent = 'Error fetching data from server.';
    });
}

// Check server status via API call every 15 seconds
function checkServerStatus()
{
    statusElement.textContent = 'Server status: Inactive';
    statusElement.style.color = 'red';
    fetch('https://thunderstoreanalytics.onrender.com/data?start_date=2025-01-01&end_date=2025-01-01')
    .then(response => {
      if (response.ok) {
        statusElement.textContent = 'Server status: Active';
        statusElement.style.color = 'green';
      } else {
        statusElement.textContent = 'Server status: Inactive';
        statusElement.style.color = 'red';
      }
    })
    .catch(error => {
      statusElement.textContent = 'Server status: Inactive';
      statusElement.style.color = 'red';
    });
}

checkServerStatus();
setInterval(checkServerStatus, 15000);
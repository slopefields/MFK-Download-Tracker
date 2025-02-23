const totalDownloadElement = document.getElementById('downloads-total');
const rangedDownloadElement = document.getElementById('downloads-ranged');

const formStartDate = document.getElementById('form-start-date');
const formEndDate = document.getElementById('form-end-date');
const dropdownSelection = document.getElementById('date-range-dropdown');
const formButton = document.getElementById('confirm-form-button');

const statusElement = document.getElementById('server-status');

dropdownSelection.addEventListener('change', function()
{
    const today = new Date();
    let start, end;

    switch (dropdownSelection.value)
    {
        case 'choose-range':
            break;
        case 'today':
            start = today;
            end = today;
            break;
        case 'last-7-days':
            start = new Date(today);
            start.setDate(today.getDate() - 7);
            end = today;
            break;
        case 'last-30-days':
            start = new Date(today);
            start.setDate(today.getDate() - 30);
            end = today;
            break;
        case 'this-month':
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = today;
            break;
        case 'last-month':
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
        case 'this-year':
            start = new Date(today.getFullYear(), 0, 1);
            end = today;
            break;
        default:
            return;
    }

        const formattedStart = start.toISOString().split('T')[0];
        const formattedEnd = end.toISOString().split('T')[0];

        console.log(formStartDate.value);
        console.log(formEndDate.value);

        // Reset custom form input
        formStartDate.value = '';
        formEndDate.value = '';

        fetchData(formattedStart, formattedEnd);
    });

formButton.addEventListener('click', function(){
    // Reset dropdown selection
    dropdownSelection.value = 'choose-range';

    if (!formStartDate.value || !formEndDate.value)
        alert('Enter both a start and end date!');
    else
    {
        let startDate = formStartDate.value;
        let endDate = formEndDate.value;

        fetchData(startDate, endDate);
    }
});

// Fetch data from backend API after startDate and endDate have values
function fetchData(startDate, endDate)
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
            totalDownloadElement.textContent = `Total downloads at this time: ${data[0].downloads}`;
            rangedDownloadElement.textContent = '';

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
    statusElement.textContent = 'Checking server status...';
    statusElement.style.color = 'gray';
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

statusElement.textContent = 'Server status: Inactive';
statusElement.style.color = 'red';
checkServerStatus();
setInterval(checkServerStatus, 30000);
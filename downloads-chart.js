let downloadsChart = null;

// Populate chart with fetched data
function updateChart(data, isGainedChart)
{
  let chartLabel, chartData;
  if (isGainedChart)
  {
    // Assign array of download data from query results to "downloadsGained" (y-axis) if graphing gained
    chartData = data.map(row => row.downloadsGained);
    chartLabel = "Downloads Gained";
  }
  else
  {
    // Assign array of download data from query results to "downloadsGained" (y-axis) if graphing gained
    chartData = data.map(row => row.downloads);
    chartLabel = "Downloads";
  }
  // Assign array of dates from query results to "dates" (x-axis)
  const dates = data.map(row => `${row.year}-${row.month}-${row.day}`);


  

  const ctx = document.getElementById("downloads-chart");

  

  // Destroy previous graph, if there was one
  if (downloadsChart)
    downloadsChart.destroy();

  


  downloadsChart = new Chart(ctx, 
    {
      type: "line",
      data: {
        labels: dates,
        datasets: [{
          label: chartLabel,
          data: chartData,
          borderColor: "white",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 2,
          pointRadius: 4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Date"
            },
            ticks: {
              autoSkip: true,
              maxRotation: 45,
              minRotation: 0
            }
          },
          y: {
            beginAtZero: isGainedChart, // Only starting at 0 if gained chart
            title: {
              display: true,
              text: "Downloads"
            }
          }
        }
      }
    });
}

window.updateChart = updateChart;
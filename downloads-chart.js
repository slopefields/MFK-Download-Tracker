let downloadsChart = null;

// Populate chart with fetched data
function updateChart(data)
{
  // Assign array of dates from query results to "dates" (x-axis)
  const dates = data.map(row => `${row.year}-${row.month}-${row.day}`);
  // Assign array of download data from query results to "downloads" (y-axis)
  const downloads = data.map(row => row.downloads);

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
          label: "Downloads",
          data: downloads,
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
            beginAtZero: false,
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
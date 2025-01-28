const ctx = document.getElementById("downloadsChart");

new Chart(ctx, 
{
  type: "line",

  data: 
  {
    labels: [""],
    datasets: 
    [
      {
        label: "Total Download Count",
        data: [5, 10, 20],
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: "white",
      },
    ],
  },

  options: 
  {
    scales: 
    {
      y: 
      {
        beginAtZero: true,
      }
    }
  }
});

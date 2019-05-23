
// read csv data, sort data by Happiness_Rank, then assign top 10 and bottom 10 counties to two variables.
var dataset;
d3.csv("static/data/2017.csv")
  .then(function(data) {
    dataset = data;
    dataset.sort(function(a, b){return a.Happiness_Rank - b.Happiness_Rank});
    var happinessTop10 = dataset.slice(0,10);
    console.log(happinessTop10);
    var happinessBottom10 = dataset.slice(-11, -1)
    console.log(happinessBottom10);
    
    // using Chart.js to make stacked chart for top 10 countries
    var ctxTop=document.getElementById("bar-chart-top")
    ctxTop.style.backgroundColor = 'white';
    new Chart(ctxTop, {
      type: 'bar',
      data: {
        labels: happinessTop10.map(c => c.Country),
        datasets: [
          {
            label: "Economy (GDP/person)",
            backgroundColor: "lightgreen",
            data: happinessTop10.map(c => c.Economy_GDP_per_Capita)
          },
          {
            label: "Dystopia Residual",
            backgroundColor: "lightblue",
            data: happinessTop10.map(c => c.Dystopia_Residual)
          },
          {
            label: "Family",
            backgroundColor: "lightpink",
            data: happinessTop10.map(c => c.Family)
          },
          {
            label: "Freedom",
            backgroundColor: "lightgrey",
            data: happinessTop10.map(c => c.Freedom)
          },
          {
            label: "Generosity",
            backgroundColor: "#D7BDE2",
            data: happinessTop10.map(c => c.Generosity)
          },
          {
            label: "Health Life Expectancy",
            backgroundColor: "lightyellow",
            data: happinessTop10.map(c => c.Health_Life_Expectancy)
          },
          {
            label: "Trust Government Corruption",
            backgroundColor: "#FAD7A0",
            data: happinessTop10.map(c => c.Trust_Government_Corruption)
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Ten Happiest Country Scores 2017'
        },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        }
      }
    });
    // making stacked chart for bottom 10 countries
    var ctxBottom=document.getElementById("bar-chart-bottom")
    ctxBottom.style.backgroundColor = 'white';
    new Chart(ctxBottom, {
      type: 'bar',
      data: {
        labels: happinessBottom10.map(c => c.Country),
        datasets: [
          {
            label: "Economy (GDP/person)",
            backgroundColor: "lightgreen",
            data: happinessBottom10.map(c => c.Economy_GDP_per_Capita)
          },
          {
            label: "Dystopia Residual",
            backgroundColor: "lightblue",
            data: happinessBottom10.map(c => c.Dystopia_Residual)
          },
          {
            label: "Family",
            backgroundColor: "lightpink",
            data: happinessBottom10.map(c => c.Family)
          },
          {
            label: "Freedom",
            backgroundColor: "lightgrey",
            data: happinessBottom10.map(c => c.Freedom)
          },
          {
            label: "Generosity",
            backgroundColor: "#D7BDE2",
            data: happinessBottom10.map(c => c.Generosity)
          },
          {
            label: "Health Life Expectancy",
            backgroundColor: "lightyellow",
            data: happinessBottom10.map(c => c.Health_Life_Expectancy)
          },
          {
            label: "Trust Government Corruption",
            backgroundColor: "#FAD7A0",
            data: happinessBottom10.map(c => c.Trust_Government_Corruption)
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Ten Least Happy Country Scores 2017'
        },
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
      }
    });

      

 })

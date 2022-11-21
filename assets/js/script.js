var apiKey = "6a9aece1391c4101ffd95525f884248e";

//api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&cnt=5&appid=d1e2d0763204896fd894698f5c6e27ee

var searchBtnEl = document.querySelector("#searchbtn");
var cityEl = document.getElementById("city");
var disCity = document.getElementById("disCity");
var temEl = document.getElementById("disTem");
var windEl = document.getElementById("disWind");
var humidityEl = document.getElementById("disHumidity");
var searchHistoryEl = document.getElementById("searchHistory");
var imgEl = document.getElementById("img");
var today = dayjs().format("MM/DD/YYYY");

// function search city
var searchCity = function (city) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  fetch(apiUrl)
    .then(function (respone) {
      if (respone.ok) {
        respone.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("Error: " + respone.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to api.");
    });
};

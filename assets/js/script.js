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

          var iconURL =
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          var cityDetail = $(`
          <h2 id="currentCity">
              ${data.name} (${today}) <img src="${iconURL}" alt="${data.weather[0].description}" />
          </h2>
          <p>Temperature: ${data.main.temp} °F</p>
          <p>Humidity   : ${data.main.humidity}\%</p>
          <p>Wind Speed : ${data.wind.speed} MPH</p>
      `);

          // add current city to html for display
          $("#cityDetail").append(cityDetail);

          fiveDayData(data.coord);
        });
      } else {
        alert("Error: " + respone.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to api.");
    });
};

searchCity("fullerton");

// five days data get from other api end point
var fiveDayData = function (coord) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=imperial&cnt=6&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (respone) {
      if (respone.ok) {
        respone.json().then(function (data) {
          console.log(data);
          // display(data);
        });
      } else {
        alert("Error: " + respone.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to api.");
    });
};

var displayFiveDay = function (data) {
  for (var i = 1; i < 6; i++) {
    var forecastInfo = {
      date: data.list[i].dt,
      icon: data.list[i].weather[0].icon,
      temp: data.list[i].main.temp,
      wind: data.list[i].wind.speed,
      humidity: data.list[i].main.humidity,
    };
  }
  var forcastDate = dayjs.unix(forecastInfo.date).format("MM/DD/YYYY");
  var iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${futureResponse.daily[i].weather[0].main}" />`;
};

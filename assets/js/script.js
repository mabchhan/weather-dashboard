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
          $("#cityDetail").empty();
          var iconURL =
            "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
          var cityDetail = $(`
          <h2 id="currentCity">
              ${data.name} (${today}) <img src="${iconURL}" alt="${data.weather[0].description}" />
          </h2>
          <p>Temperature : ${data.main.temp} °F</p>
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

//searchCity("fullerton");

// five days data get from other api end point
var fiveDayData = function (coord) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&units=imperial&cnt=40&appid=${apiKey}`;
  fetch(apiUrl)
    .then(function (respone) {
      if (respone.ok) {
        respone.json().then(function (data) {
          console.log(data);
          $("#fivedayforecast").empty();
          displayFiveDay(data);
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
  for (var i = 7; i < 40; i += 8) {
    var forecastInfo = {
      date: data.list[i].dt,
      icon: data.list[i].weather[0].icon,
      temp: data.list[i].main.temp,
      wind: data.list[i].wind.speed,
      humidity: data.list[i].main.humidity,
    };
    //console.log(forecastInfo.date);

    var iconURL = `<img src="https://openweathermap.org/img/w/${forecastInfo.icon}.png" " />`;

    var forecastDetail = $(`
               
                    <div class="col  bg-primary text-light" style="width: 12rem";>
                        <div class="card-body">
                            <h5>${dayjs
                              .unix(forecastInfo.date)
                              .format("MM/DD/YYYY")}
                            </h5>
                            <p>${iconURL}</p>
                            <p>Temp : ${forecastInfo.temp} °F</p>
                            <p>Wind : ${forecastInfo.wind} MPH</p>
                            <p>Humidity : ${forecastInfo.humidity}\%</p>
                        </div>
                    </div>
               
            `);

    $("#fivedayforecast").append(forecastDetail);
  }
};

var searchHistoryList = [];

// search button
$("#searchbtn").on("click", function (e) {
  e.preventDefault();

  var cityValue = $("#city").val().trim();
  if (cityValue === "") {
    alert("Please input city name for search.");
    cityEl.focus();
    return;
  }
  searchCity(cityValue);
  //latLon();
  if (!searchHistoryList.includes(cityValue)) {
    searchHistoryList.push(cityValue);
    var citySearched = $(
      `<button class="btn btn-secondary btn-sm history-list">${cityValue}</button>`
    );
    // citySearched.textContent = cityValue;
    $("#searchHistory").append(citySearched);
  }
  localStorage.setItem("city", JSON.stringify(searchHistoryList));
});

// click on search history
$(document).on("click", ".history-list", function () {
  var historyList = $(this).text();
  searchCity(historyList);
});

//when we load
var init = function () {
  var getLocalData = JSON.parse(localStorage.getItem("city"));
  if (getLocalData !== null) {
    var index = getLocalData.length - 1;
    searchCity(getLocalData[index]);
  }
};

init();

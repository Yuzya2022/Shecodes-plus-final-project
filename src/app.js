function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes<10){
        minutes=`0${minutes}`;
    }
    let days =[
        "Sunday", 
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday" 
        ]
    let day = days[date.getDay()];

    return `Last update: ${day} ${hours}:${minutes}`;
}

function displayTemperature(response){

let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celciusTemp = response.data.main.temp;

temperatureElement.innerHTML= Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt*1000);
iconElement.setAttribute(
    "src",
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
iconElement.setAttribute(
    "alt",
response.data.weather[0].description
);
}
function search(city){
    let apiKey ="ae90fe1370b958ce3e09241e935b028f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event){
    event.preventDefault();
    let cityInputElement =document.querySelector("#city-input");
   search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemp(event){
    event.preventDefault();
    let fahrenheitTemp =(celciusTemp*9)/5+32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);

    fahrenheit.classList.remove("active");
    celcius.classList.add("active");
}

function showCelciusTemp(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemp);

    fahrenheit.classList.add("active");
    celcius.classList.remove("active");

}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);

let celciusTemp = null;

search("Kyiv");

function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
  
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon","Tue"];
  
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    console.log(forecastHTML);
  }

displayForecast();

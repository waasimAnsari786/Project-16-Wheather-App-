// let URL = 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=0S419hOTpo63JEY1j97i4p3tuSYjIkn5';
let city = 'karachi';
let w_city = document.querySelector(".city-name");
let dateAndTime = document.querySelector(".date-and-time");
let climate = document.querySelector(".weather");
let w_icon = document.querySelector(".icon");
let temp = document.querySelector(".temp");
let minTemp = document.querySelector(".min-temp");
let maxTemp = document.querySelector(".max-temp");
let feels = document.querySelector("#feels");
let humidity = document.querySelector("#humidity");
let w_wind = document.querySelector("#wind");
let pressure = document.querySelector("#pressure");
let searchInp = document.querySelector(".search");
let btn = document.querySelector("#btn");

const fetchData = async () => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e8b2a8e8dfc6de36a2ca5b889ba4bfa2`;

    try {
        let response = await fetch(URL);
        let data = await response.json();

        let { weather, wind, sys , main , dt , name } = data;

        let countryName = new Intl.DisplayNames([sys.country], { type: 'region' }).of(sys.country);
        w_city.innerText = `${name}, ${countryName}`;

        let secIntoMs = new Date(dt * 1000);
        const options = {
            weekday : "long",
            year : "numeric",
            month : "long",
            day : "numeric",
            hour : "numeric",
            minute : "numeric",
        };
        const finalDate = new Intl.DateTimeFormat('en-US' , options).format(secIntoMs);
        dateAndTime.innerText = finalDate;

        climate.innerText = weather[0].main;
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">`;
        temp.innerHTML = `${main.temp}&#176`;
        minTemp.innerHTML = `${main.temp_min}&#176`;
        maxTemp.innerHTML = `${main.temp_max}&#176`;
        feels.innerHTML = `${main.feels_like}&#176`;
        humidity.innerHTML = `${main.humidity}&#176`;
        pressure.innerHTML = `${main.pressure}&#176`;
        w_wind.innerText = `${wind.speed} m/s`;

    } catch (error) {
        let mainDiv = document.querySelector(".weather-app");
        mainDiv.innerText = 'Sorry! there is something wrong with your API call.'
        mainDiv.classList.add("min-temp");
    }
};

window.addEventListener("load", fetchData);
searchInp.addEventListener("submit" , (evt) => {
    evt.preventDefault();
    city = searchInp.children[1].value;
    fetchData();
});
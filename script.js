const now_temp = document.getElementById('now_temp');
const now_condition_icon = document.getElementById('now_condition_icon');
const now_condition = document.getElementById('now_condition');
const now_date = document.getElementById('now_date');
const now_location = document.getElementById('now_location');

const aq_pm = document.getElementById('aq_pm');
const aq_so = document.getElementById('aq_so');
const aq_no = document.getElementById('aq_no');
const aq_o = document.getElementById('aq_o');

const ss_sunriseTime = document.getElementById('ss_sunriseTime');
const ss_sunsetTime = document.getElementById('ss_sunsetTime');

const humidityPercent = document.getElementById('humidityPercent');
const windSpeed = document.getElementById('windSpeed');
const visibilityDistance = document.getElementById('visibilityDistance');
const feelsLike_temp = document.getElementById('feelsLike_temp');

const forecast_condition_icon = document.getElementById('forecast_condition_icon');
const forecast_temp = document.getElementById('forecast_temp');
const forecast_date = document.getElementById('forecast_date');
const forecast_day = document.getElementById('forecast_day');


const api_key = '08f52bb32c104b07b1e124813240512';

const fetchData = async (city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=5&aqi=yes&alerts=no`);
    const data = await response.json();
    return data;
}

const showData = async (city) => {
    const data = await fetchData("Almaty");
    console.log(data);
    updateNowData(data);
}

showData();

const updateNowData = (data) => {
    now_temp.textContent = data.current.temp_c + '°C';
    now_condition.textContent = data.current.condition.text;
    now_condition_icon.src = "https:" + data.current.condition.icon;
    now_date.textContent = data.location.localtime;
    now_location.textContent = data.location.name;
}

console.log(now_temp.textContent);

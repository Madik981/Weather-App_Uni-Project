const now_temp = document.getElementById('now_temp');
const now_condition_icon = document.getElementById('now_condition_icon');
const now_condition = document.getElementById('now_condition');
const now_date = document.getElementById('now_date');
const now_location = document.getElementById('now_location');
const now_boxBottom = document.getElementById('now_boxBottom');

const forecast_boxesList = document.getElementById('forecast__boxesList');

const aq_pm = document.getElementById('aq_pm');
const aq_so = document.getElementById('aq_so');
const aq_no = document.getElementById('aq_no');
const aq_o = document.getElementById('aq_o');
const aqBoxes_cards = document.querySelectorAll('.aq-boxes__card');

const ss_sunriseTime = document.getElementById('ss_sunriseTime');
const ss_sunsetTime = document.getElementById('ss_sunsetTime');
const ssBoxes_cards = document.querySelectorAll('.ss-boxes__card');

const humidityPercent = document.getElementById('humidityPercent');
const windSpeed = document.getElementById('windSpeed');
const visibilityDistance = document.getElementById('visibilityDistance');
const feelsLike_temp = document.getElementById('feelsLike_temp');
const highlightsBottom_cards = document.querySelectorAll('.boxes-quadruple__card');
const highlights_icons = document.querySelectorAll('.highlights__icon');

const todayAt_boxes = document.getElementById('todayAt_boxes');



const api_key = '08f52bb32c104b07b1e124813240512';

const fetchData = async (city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=6&aqi=yes&alerts=no`);
    const data = await response.json();
    return data;
}

const showData = async (city) => {
    const data = await fetchData("Almaty");
    console.log(data);
    updateNowData(data);
    updateAQData(data);
    updateForecastData(data);
    updateSSData(data);
    updateHighlightsBottomData(data);
    updateTodayAtData(data);
}

showData();




const updateNowData = (data) => {
    now_temp.textContent = data.current.temp_c + '°C';
    now_condition.textContent = data.current.condition.text;
    now_condition_icon.src = "https:" + data.current.condition.icon;
    now_date.textContent = convertDateDataToDate(data.forecast.forecastday[0].date) + ", " + convertDateDataToDay(data.forecast.forecastday[0].date);
    now_location.textContent = data.location.name;

    now_temp.classList.add('active');
    now_condition.classList.add('active');
    now_condition_icon.classList.add('active');
    now_date.classList.add('active');
    now_location.classList.add('active');
    now_boxBottom.classList.add('active');
}




const updateForecastData = (data) => {
    for (let i = 1; i < data.forecast.forecastday.length; i++) {
        if(i == data.forecast.forecastday.length - 1){
            forecast_boxesList.insertAdjacentHTML('beforeend', `<div class="forecast__box last">
                <div class="forecast__box__weather">
                    <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="weatherCondition" class="forecast__box__weather-condition">
                    <div class="forecast__box__text">
                        <p class="forecast__box__weather-temp">${data.forecast.forecastday[i].day.maxtemp_c} / ${data.forecast.forecastday[i].day.mintemp_c}</p>
                    </div>
                </div>
                <div class="forecast__box__text">
                    <p class="forecast__text" id="forecast_date">${convertDateDataToDate(data.forecast.forecastday[i].date)}</p>
                </div>
                <div class="forecast__box__text">
                    <p class="forecast__text">${convertDateDataToDay(data.forecast.forecastday[i].date)}</p>
                </div>
            </div>`);
            const forecast_boxes = document.querySelectorAll('.forecast__box');
            forecast_boxes.forEach((box) => {
                setTimeout(() => {box.classList.add('active');}, 10);
            });
        } else {
            forecast_boxesList.insertAdjacentHTML('beforeend', `<div class="forecast__box">
                <div class="forecast__box__weather">
                    <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="weatherCondition" class="forecast__box__weather-condition">
                    <div class="forecast__box__text">
                        <p class="forecast__box__weather-temp">${data.forecast.forecastday[i].day.maxtemp_c} / ${data.forecast.forecastday[i].day.mintemp_c}</p>
                    </div>
                </div>
                <div class="forecast__box__text">
                    <p class="forecast__text" id="forecast_date">${convertDateDataToDate(data.forecast.forecastday[i].date)}</p>
                </div>
                <div class="forecast__box__text">
                    <p class="forecast__text">${convertDateDataToDay(data.forecast.forecastday[i].date)}</p>
                </div>
            </div>`);
            const forecast_boxes = document.querySelectorAll('.forecast__box');
                forecast_boxes.forEach((box) => {
                setTimeout(() => {box.classList.add('active');}, 10);
            });
        }
    };
    const forecast_boxes = document.querySelectorAll('.forecast__box');
    forecast_boxes.forEach((box) => {
        setTimeout(() => {box.classList.add('active');}, 10);
      });
    // forecast_boxesList.insertAdjacentHTML('beforeend', `<div class="forecast__box">
    //                             <div class="forecast__box__weather">
    //                                 <img src="./assets/icons/512px-Antu_weather-clouds.png" alt="weatherCondition" class="forecast__box__weather-condition" id="forecast_condition_icon">
    //                                 <div class="forecast__box__text">
    //                                     <p class="forecast__box__weather-temp" id="forecast_temp">25°C</p>
    //                                 </div>
    //                             </div>
    //                             <div class="forecast__box__text">
    //                                 <p class="forecast__text" id="forecast_date">6 Dec</p>
    //                             </div>
    //                             <div class="forecast__box__text">
    //                                 <p class="forecast__text" id="forecast_day">Friday</p>
    //                             </div>
    //                         </div>`);
    
}




const updateAQData = (data) => {
    aq_pm.textContent = data.current.air_quality.pm2_5;
    aq_so.textContent = data.current.air_quality.so2;
    aq_no.textContent = data.current.air_quality.no2;
    aq_o.textContent = data.current.air_quality.o3;
    aqBoxes_cards.forEach((card) => {
        card.classList.add('active');
      });
}

console.log(now_temp.textContent);




const updateSSData = (data) => {
    ss_sunriseTime.textContent = convertTimeFormat(data.forecast.forecastday[0].astro.sunrise);
    ss_sunsetTime.textContent = convertTimeFormat(data.forecast.forecastday[0].astro.sunset);
    ssBoxes_cards.forEach((card) => {
        card.classList.add('active');
      });
}

const convertTimeFormat = (timeString) => {
    const [time, period] = timeString.split(' '); 
    let [hours, minutes] = time.split(':').map(Number);
  
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
  
    hours = hours.toString().padStart(2, '0');
  
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
}




const updateHighlightsBottomData = (data) => {
    humidityPercent.textContent = data.current.humidity + "%";
    windSpeed.textContent = data.current.wind_kph + " km/h";
    visibilityDistance.textContent = data.current.vis_km + " km";
    feelsLike_temp.textContent = data.current.feelslike_c + "°C";

    highlightsBottom_cards.forEach((card) => {
        card.classList.add('active');
    });
    highlights_icons.forEach((icon) => {
        icon.classList.add('active');
    });
}




const updateTodayAtData = (data) => {
    for (let i = 0; i < data.forecast.forecastday[0].hour.length; i++) {
        const time = i.toString().padStart(2, '0') + ":00";
        todayAt_boxes.insertAdjacentHTML('beforeend', `<div class="todayAt__boxes__card">
            <div class="card__box-bottom">
                <p class="todayAt__text">${time}</p>
                <img src="${data.forecast.forecastday[0].hour[i].condition.icon}" alt="weatherCondition" class="todayAt__icon">
                <p class="todayAt__text" id="todayAt_temp">${data.forecast.forecastday[0].hour[i].temp_c}°C</p>
            </div>
            <div class="card__box-text">
                <p class="todayAt__text">${time}</p>
            </div>
        </div>`);
    }
    const todayAt_icons = document.querySelectorAll('.todayAt__icon');
    todayAt_icons.forEach((icon) => {
        setTimeout(() => {icon.classList.add('active');}, 10);
    })
}






const convertDateDataToDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString('en-US', { 
        day: 'numeric',
        month: 'short'
    });
}

const convertDateDataToDay = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString('en-US', { weekday: 'short' });
}
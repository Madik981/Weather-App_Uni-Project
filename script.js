//Retrieving elements from the DOM
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


const city = document.getElementById('searchInp');
const searchBtn = document.getElementById('searchBtn');
const refreshBtn = document.getElementById('refreshBtn');

let currentCity = "";

//refresh data every 15 minutes
setInterval(() => {
    if(currentCity === "") return;
    showData(currentCity);
}, 900000);

//refresh data when refresh button is clicked
refreshBtn.onclick = () => {
    if(currentCity === "") return;
    showData(currentCity);
}

//search data when search button is clicked
searchBtn.onclick = () => {
    if(city.value.trim() === "") return;
    showData(city.value);
    currentCity = city.value;
    city.value = '';
}

//search data when enter key is pressed
city.onkeydown = (e) => {
    if(city.value.trim() === "") return;
    if(e.key === "Enter"){
        showData(city.value);
        currentCity = city.value;
        city.value = '';
    }
}

const api_key = 'ab2c33cb32ab48f5b8353623242312';


//fetch data from api
const fetchData = async (city) => {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=6&aqi=yes&alerts=no`);
    const data = await response.json();
    return data;
}


//show data based on city
const showData = async (city) => {
    const data = await fetchData(city);
    console.log(data);
    updateNowData(data);
    updateAQData(data);
    updateForecastData(data);
    updateSSData(data);
    updateHighlightsBottomData(data);
    updateTodayAtData(data);
    updateBackground(data.current.condition.text, data);
    // data.current.condition.text

}

// showData(city.value);



//update now data based on current weather data
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



//update forecast data based on daily forecast data
const updateForecastData = (data) => {
    forecast_boxesList.innerHTML = '';
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



//update air quality data based on current weather data
const updateAQData = (data) => {
    aq_pm.textContent = data.current.air_quality.pm2_5.toFixed(1);
    aq_so.textContent = data.current.air_quality.so2.toFixed(1);
    aq_no.textContent = data.current.air_quality.no2.toFixed(1);
    aq_o.textContent = data.current.air_quality.o3.toFixed(1);
    aqBoxes_cards.forEach((card) => {
        card.classList.add('active');
      });
}

console.log(now_temp.textContent);



//update sunrise and sunset time based on current weather data
const updateSSData = (data) => {
    ss_sunriseTime.textContent = convertTimeFormat(data.forecast.forecastday[0].astro.sunrise);
    ss_sunsetTime.textContent = convertTimeFormat(data.forecast.forecastday[0].astro.sunset);
    ssBoxes_cards.forEach((card) => {
        card.classList.add('active');
      });
}

//convert time format from 12hr to 24hr
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



//update highlights bottom data based on current weather data
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




//update today at data based on hourly forecast
const updateTodayAtData = (data) => {
    todayAt_boxes.innerHTML = '';
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





//convert date data to date format
const convertDateDataToDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString('en-US', { 
        day: 'numeric',
        month: 'short'
    });
}

//convert date string to day
const convertDateDataToDay = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleString('en-US', { weekday: 'short' });
}



//update background image based on weather condition
const updateBackground = (condition, data) => {
    const body = document.querySelector('body');

    //check if it is day or night
    if(data.current.is_day == 1){
        switch (condition.toLowerCase()) {
            case 'sunny': case 'clear':
                body.style.background = "url('./assets/backgrounds/day/day-sunny.png')";
                backgroundStyle(body);
                updateWidgetsTheme('light');
                break;
            case 'partly cloudy':
                body.style.background = "url('./assets/backgrounds/day/day-partlyCloudy.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'cloudy': case 'overcast':
                body.style.background = "url('./assets/backgrounds/day/day-cloudy.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'mist': case 'fog': case 'freezing fog':
                body.style.background = "url('./assets/backgrounds/day/day-fog.png')";
                alert('Warning! There might be fog in your area');
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'patchy rain possible': case 'patchy freezing drizzle possible': case 'patchy light drizzle': case 'light drizzle': case 'freezing drizzle': case 'heavy freezing drizzle': case 'patchy light rain': case 'light rain': case 'moderate rain at times': case 'moderate rain': case 'heavy rain at times': case 'heavy rain': case 'light freezing rain': case 'moderate or heavy freezing rain': case 'light rain shower': case 'moderate or heavy rain shower': case 'torrential rain shower':
                body.style.background = "url('./assets/backgrounds/day/day-rain.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'patchy snow possible': case 'patchy sleet possible': case 'light sleet': case 'moderate or heavy sleet': case 'patchy light snow': case 'light snow': case 'patchy moderate snow': case 'moderate snow': case 'patchy heavy snow': case 'heavy snow': case 'ice pellets': case 'light snow showers': case 'moderate or heavy snow showers': case 'light showers of ice pellets': case 'moderate or heavy showers of ice pellets': case 'patchy light snow with thunder': case 'moderate or heavy snow with thunder':
                body.style.background = "url('./assets/backgrounds/day/day-snow1.jpg')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'thundery outbreaks possible': case 'tatchy light rain with thunder': case 'moderate or heavy rain with thunder':
                body.style.background = "url('./assets/backgrounds/day/day-thunder.png')";
                alert('Warning! There might be thunder in your area');
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'blowing snow': case 'blizzard':
                body.style.background = "url('./assets/backgrounds/day/day-snow1.jpg')";
                alert('Warning! There might be blizzard outside');
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            default:
                console.log('Unknown weather condition');
        }
    } else {
        switch (condition.toLowerCase()) {
            case 'sunny': case 'clear':
                body.style.background = "url('./assets/backgrounds/night/night-clear1.png')";
                backgroundStyle(body);
                updateWidgetsTheme('light');
                break;
            case 'partly cloudy':
                body.style.background = "url('./assets/backgrounds/night/night-partlyCloudy.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'cloudy': case 'overcast':
                body.style.background = "url('./assets/backgrounds/night/night-cloudy.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'mist': case 'fog': case 'freezing fog':
                body.style.background = "url('./assets/backgrounds/night/night-fog.png')";
                alert('Warning! There might be fog in your area');
                backgroundStyle(body);
                updateWidgetsTheme('light');
                break;
            case 'patchy rain possible': case 'patchy freezing drizzle possible': case 'patchy light drizzle': case 'light drizzle': case 'freezing drizzle': case 'heavy freezing drizzle': case 'patchy light rain': case 'light rain': case 'moderate rain at times': case 'moderate rain': case 'heavy rain at times': case 'heavy rain': case 'light freezing rain': case 'moderate or heavy freezing rain': case 'light rain shower': case 'moderate or heavy rain shower': case 'torrential rain shower':
                body.style.background = "url('./assets/backgrounds/night/night-rain.png')";
                backgroundStyle(body);
                updateWidgetsTheme('light');
                break;
            case 'patchy snow possible': case 'patchy sleet possible': case 'light sleet': case 'moderate or heavy sleet': case 'patchy light snow': case 'light snow': case 'patchy moderate snow': case 'moderate snow': case 'patchy heavy snow': case 'heavy snow': case 'ice pellets': case 'light snow showers': case 'moderate or heavy snow showers': case 'light showers of ice pellets': case 'moderate or heavy showers of ice pellets': case 'patchy light snow with thunder': case 'moderate or heavy snow with thunder':
                body.style.background = "url('./assets/backgrounds/night/night-snowyFog.png')";
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'thundery outbreaks possible': case 'patchy light rain with thunder': case 'moderate or heavy rain with thunder':
                body.style.background = "url('./assets/backgrounds/night/night-thunder.png')";
                alert('Warning! There might be thunder in your area');
                backgroundStyle(body);
                updateWidgetsTheme('dark');
                break;
            case 'blowing snow': case 'blizzard':
                body.style.background = "url('./assets/backgrounds/night/night-snow.png')";
                alert('Warning! There might be blizzard outside');
                backgroundStyle(body);
                updateWidgetsTheme('light');
                break;
            default:
                console.log('Unknown weather condition');
        }
    }
}

const backgroundStyle = (body) => {
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
}

//update widgets theme based on theme
const updateWidgetsTheme = (theme) => {
    const widgets = {
        searchContainer: document.querySelector('.searchContainer'),
        refreshBox: document.querySelector('.refreshBox'),
        widget_weatherNow: document.querySelector('.widget__weatherNow'),
        widget_forecast: document.querySelector('.widget__forecast'),
        widget_highlights: document.querySelector('.widget__highlights'),
        widget_todayAt: document.querySelector('.widget__todayAt')
    }

    const subWidgets = {
        highlights_aqandss: document.querySelectorAll('.highlights__boxes-double__box'),
        highlights_other4widgets: document.querySelectorAll('.highlights__boxes-quadruple__box')
    }

    const todayAtCards = {
        cards_bottom: document.querySelectorAll('.card__box-bottom'),
        cards_text: document.querySelectorAll('.card__box-text')
    }


    changeWidgetsTheme(theme, Object.values(widgets), Object.values(subWidgets), Object.values(todayAtCards));  
}

//change widgets theme based on theme
const changeWidgetsTheme = (theme, widgets, subWidgets, todayAtCards) => {
    if(theme === 'light'){
        widgets.forEach((widget) => {
            removeDarkTheme(widget);
        });
        subWidgets.forEach((subWidget) => {
            subWidget.forEach((box) => {
                removeDarkTheme(box);
            });
        });
        todayAtCards.forEach((card) => {
            card.forEach((box) => {
                removeDarkTheme(box);
            });
        });
    } else if(theme === 'dark'){
        widgets.forEach((widget) => {
            addDarkTheme(widget);
        });
        subWidgets.forEach((subWidget) => {
            subWidget.forEach((box) => {
                addDarkTheme(box);
            });
        });
        todayAtCards.forEach((card) => {
            card.forEach((box) => {
                addDarkTheme(box);
            });
        });
    };
};

const addDarkTheme = (element) => {
    if(!element.classList.contains('dark')){
        element.classList.add('dark');
    };
}

const removeDarkTheme = (element) => {
    if(element.classList.contains('dark')){
        element.classList.remove('dark');
    };
}
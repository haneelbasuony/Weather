'use strict';

const searchInput = document.getElementById('searchInput');
const region = document.getElementById('region');
const todayTemp = document.getElementById('todayTemp');
const todayStatusIcon = document.getElementById('todayStatusIcon');
const todayStatus = document.getElementById('todayStatus');
const umbrella = document.getElementById('umbrella');
const wind = document.getElementById('wind');
const direction = document.getElementById('direction');
const tommorwStatusIcon = document.getElementById('tommorwStatusIcon');
const tommorowTempMax = document.getElementById('tommorowTempMax');
const tommorowTempMin = document.getElementById('tommorowTempMin');
const tommorowStatus = document.getElementById('tommorowStatus');
const afterTommStatusIcon = document.getElementById('afterTommStatusIcon');
const afterTommTempMax = document.getElementById('afterTommTempMax');
const afterTommTempMin = document.getElementById('afterTommTempMin');
const afterTommStatus = document.getElementById('afterTommStatus');
searchInput.addEventListener('keyup', (e) => {
  var query = e.target.value;
  fetchData(query);
});

async function fetchData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=56b7e9f874384ff5a47232928241212&q=${location}&days=3`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { forecastday } = data.forecast;
    const { 1: tomorrow, 2: afterTomorrow } = forecastday;

    // Left Seccsion
    region.innerHTML = data.location.name;
    if (
      todayTemp.firstChild &&
      todayTemp.firstChild.nodeType === Node.TEXT_NODE
    ) {
      todayTemp.firstChild.remove();
    }
    todayTemp.insertAdjacentText('afterbegin', data.current.temp_c);
    todayStatusIcon.setAttribute('src', data.current.condition.icon);
    todayStatus.innerText = data.current.condition.text;
    umbrella.textContent = data.current.humidity;
    wind.innerText = data.current.wind_mph;
    direction.textContent = data.current.wind_dir;

    //Middle Section
    tommorwStatusIcon.setAttribute('src', tomorrow.day.condition.icon);

    const tommorowTempMax = document.getElementById('tommorowTempMax');

    tommorowTempMax.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });

    tommorowTempMax.insertAdjacentText('afterbegin', tomorrow.day.maxtemp_c);

    const tommorowTempMin = document.getElementById('tommorowTempMin');

    tommorowTempMin.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });

    tommorowTempMin.insertAdjacentText('afterbegin', tomorrow.day.mintemp_c); // Replace `tomorrow.day.mintemp_c` with your data

    tommorowStatus.innerText = tomorrow.day.condition.text;

    //Right Section
    afterTommStatusIcon.setAttribute('src', afterTomorrow.day.condition.icon);
    const afterTommTempMax = document.getElementById('afterTommTempMax');
    afterTommTempMax.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });
    afterTommTempMax.insertAdjacentText('afterbegin', '30');
    const afterTommTempMin = document.getElementById('afterTommTempMin');
    afterTommTempMin.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });

    afterTommTempMin.insertAdjacentText('afterbegin', '20');

    afterTommStatus.innerText = afterTomorrow.day.condition.text;

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

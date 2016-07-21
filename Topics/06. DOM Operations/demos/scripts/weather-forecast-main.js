var wrapper = document.getElementById('wrapper'),
  template = document.getElementById('template'),
  h2 = document.createElement('h2'),
  forecastContainer = document.createElement('ul'),
  detCont = document.createElement('div'),

  dayLi = template.getElementsByClassName('day-forecast')[0],
  dateCont = template.getElementsByClassName('date-cont')[0],
  imgTag = template.getElementsByClassName('forecast-icon')[0],
  tempCont = template.getElementsByClassName('temp-cont')[0],

  //dayLi = document.createElement('li'),
  //dateCont = document.createElement('div'),
  //imgTag = document.createElement('img'),
  //tempCont = document.createElement('div'),

  list = data.list,
  baseIconUrl = 'http://openweathermap.org/img/w/';

h2.innerText = 'Weather forecast for ' + data.city.name;
wrapper.appendChild(h2);

forecastContainer.id = 'weather-forecast';
detCont.id = 'details-container';

for (var i = 0, len = list.length; i < len; i += 1) {
  let day = list[i];

  dateCont.innerText = (new Date(day.dt * 1000)).toUTCString().substr(0, 11);
  imgTag.src = baseIconUrl + day.weather[0].icon + '.png';
  tempCont.innerText = day.temp.day.toFixed(1) + ' °C';

  dayLi.setAttribute('data-index', i);
    
  forecastContainer.appendChild(dayLi.cloneNode(true));
}

forecastContainer.addEventListener('click', function (ev) {
  let index,
    selectedDay;
  if (ev.target.hasAttribute('data-index')) {
    index = ev.target.getAttribute('data-index');
  } else {
    index = ev.target.parentElement.getAttribute('data-index');
  }

  selectedDay = data.list[index];
  detCont.innerText = JSON.stringify(selectedDay);
  
}, false);


wrapper.appendChild(forecastContainer);
wrapper.appendChild(detCont);


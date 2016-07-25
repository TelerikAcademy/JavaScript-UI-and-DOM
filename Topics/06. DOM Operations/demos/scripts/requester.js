var requester = (function () {
  var core = {
    getJSON: function getJSON(url) {
      var promise = new Promise(function (resolve, rejext) {
        var client = new XMLHttpRequest(),
            response,
            jsonResponse;

        client.open('GET', url, true);
        client.send();

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(JSON.parse(this.response));
          } else {
            reject(this.statusText);
          }
        };

        client.onerror = function () {
          reject(this.statusText);
        };
      });

      return promise;
    }
  };

  return {
    getJSON: core.getJSON,
  };
})();

function getForecast() {
  var wrapper = document.getElementById('wrapper'),
    dayCount = document.getElementById('day-count').value,
    openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Sofia&mode=json&units=metric&cnt=' + dayCount + '&appid=db3f6e6995ade634f09ccd414ed12d78';  
  
  requester.getJSON(openWeatherUrl)
    .then(function (forecast) {
      var list = forecast.list,
        len = list.length,
        dayTemplate,
        frag = document.createDocumentFragment();
      for (var i = 0; i < len; i+=1) {
        dayTemplate = weatherTemplate.fillInData(list[i]);
        frag.appendChild(dayTemplate);
      }
      while (wrapper.children) {
        wrapper.remove(wrapper.firstChild);
      }
      wrapper.appendChild(frag);
    })
};

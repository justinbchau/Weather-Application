window.addEventListener('load', () => {
    let long;
    let lat;

    // API Keys
    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const key = `bc4956f82ef6ad27ebd991dfeb700c03`;
    const google = `AIzaSyBpKtgxxOQs92KTuKp3_dmdlzPXTdK7k4I`;

    // DOM Selectors
    let currentTimeZone = document.querySelector('.current__timezone');
    let currentWeather = document.querySelector('.current__weather');
    let weatherDes = document.querySelector('.weather__description');
    const btn = document.querySelector('.btn');
    let currentTime = document.querySelector('.current__time');
    let comingForecast = document.querySelector('.coming__forecast');
    let city = document.querySelector('.current__city');


  

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          //-- Google Reverse GeoLocation API --//
          const map = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${google}`;

          fetch(map)
          .then(response => {
            return response.json();
          })
          .then(googleData => {
            console.log(googleData);
            let address = googleData.results[6].formatted_address;
            console.log(address);

            city.textContent = address;
          })


          //-- DarkSky API --//
          const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}` + `?format=jsonp`;

          fetch(api)
          .then(response => {
            //Converting JSON to JS
            return response.json();
          })
          .then(data => {
            //Pulling data to manipulate from the API
            console.log(data);
            let timeZone = data.timezone;
            let weather = data.currently.temperature;
            let sum = data.currently.summary;
            let icon = data.currently.icon;
            const now = new Date();
            //Setting DOM elements to the Data

            //currentTimeZone.textContent = timeZone.replace(/_/g, " ");
            currentWeather.textContent = weather;
            weatherDes.textContent = sum;

            new Intl.DateTimeFormat('en-US', { dateStyle: 'short' }).format(now);
            currentTime.textContent = now;

            //Conversion Formula
            let celcius =  (currentWeather.textContent - 32) * (5 / 9);
            //Convert Farenheit to Celcius
            btn.addEventListener("click" , () => {
              let degree = document.querySelector('.degree');
              if (degree.textContent === 'F') {
                degree.textContent = 'C';
                currentWeather.textContent = Math.floor(celcius);
              } else {
                degree.textContent = 'F';
                currentWeather.textContent = weather;
              }
            });
            setIcons(icon, document.querySelector('.icon'));

            let forecast = data.daily.summary;
            console.log(forecast);
            comingForecast.textContent = forecast;



          })
        });
    } else {
      
      alert('There was an error');
    }

    // Function to set the correct skycons
    function setIcons(icon, iconID) {
      const skycons = new Skycons({"color": "black"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
});

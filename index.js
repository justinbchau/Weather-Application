window.addEventListener('load', () => {
    let long;
    let lat;

    let currentTime = document.querySelector('.current__time');
    let currentWeather = document.querySelector('.current__weather');
    let weatherDes = document.querySelector('.weather__description');
    const btn = document.querySelector('.btn');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          long = position.coords.longitude;
          lat = position.coords.latitude;

          const proxy = `https://cors-anywhere.herokuapp.com/`;
          const key = `bc4956f82ef6ad27ebd991dfeb700c03`;

          const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}` + `?format=jsonp`;

          fetch(api)
          .then(response => {
            //Converting JSON to JS
            return response.json();
          })
          .then(data => {
            //Pulling data to manipulate from the API
            console.log(data);
            let time = data.timezone;
            let weather = data.currently.temperature;
            let sum = data.currently.summary;
            let icon = data.currently.icon;
            //Setting DOM elements to the Data
            currentTime.textContent = time;
            currentWeather.textContent = weather;
            weatherDes.textContent = sum;
            

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
          })
        

        });
    } else {
      alert('There was an error');
    }

    function setIcons(icon, iconID) {
      const skycons = new Skycons({"color": "black"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
});

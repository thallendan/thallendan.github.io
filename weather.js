
          // Function to get current time
          function getTime(timeZone) {
            const options = { 
              timeZone: timeZone, 
                hour12: true, 
                hour: 'numeric', 
                minute: 'numeric', 
                second: 'numeric' 
              };
              const timeString = new Date().toLocaleTimeString('en-US', options);
            return timeString;
          }
      
          // Function to get current temperature for Bangkok
          async function getBangkokTemp() {
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Bangkok,th&appid=" + config.WEATHER_KEY + "&units=metric");
            const data = await response.json();
            const temp = data.main.temp;
            return temp;
          }
      
          // Function to get current temperature for Holland
          async function getHollandTemp() {
            const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Holland,michigan&appid=" + config.WEATHER_KEY + "&units=metric");
            const data = await response.json();
            const temp = data.main.temp;
            return temp;
          }
      
          // Function to display time and temperature
          async function displayTimeAndTemp() {
            const bangkokTemp = await getBangkokTemp();
            const hollandTemp = await getHollandTemp();
            const bangkokTime = getTime('Asia/Bangkok');
            const hollandTime = getTime('America/Detroit');
      
            document.getElementById("bangkok-time").textContent = "Bangkok Time: " + bangkokTime;
            document.getElementById("holland-time").textContent = "Holland Time: " + hollandTime;
            document.getElementById("bangkok-temp").textContent = "Bangkok Temperature: " + bangkokTemp + "°C";
            document.getElementById("holland-temp").textContent = "Holland Temperature: " + hollandTemp + "°C";
          }

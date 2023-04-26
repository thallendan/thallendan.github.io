
            // Retrieve Bitcoin and Binance Coin prices from a third-party API
            fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,binancecoin,ethereum&vs_currencies=usd')
            .then(response => response.json())
            .then(data => {
                // Update the HTML with the current prices
                // document.getElementById('btc-price').textContent = data.bitcoin.usd;
                // document.getElementById('bnb-price').textContent = data.binancecoin.usd;

                // Set the bar values based on the current prices
                const btcPrice = data.bitcoin.usd;
                const bnbPrice = data.binancecoin.usd;
                const ethPrice = data.ethereum.usd;
                console.log(`btc: ${btcPrice}`);
                console.log(`bnb: ${bnbPrice}`);
                console.log(`eth: ${ethPrice}`);
            
                const bar1Value = btcPrice;
                const bar2Value = bnbPrice;
                const bar3Value = ethPrice;

                // Update the HTML with the current prices
                document.getElementById('bar1Value').textContent = bar1Value;
                document.getElementById('bar2Value').textContent = bar2Value;
                document.getElementById('bar3Value').textContent = bar3Value;


                // Get the bar elements and update the position of the circle for each bar
                const bar1 = document.querySelector('.bar:nth-of-type(1)');
                const bar2 = document.querySelector('.bar:nth-of-type(2)');
                const bar3 = document.querySelector('.bar:nth-of-type(3)');
                const circle1 = bar1.querySelector('.coin-silver');
                const circle2 = bar2.querySelector('.coin-gold');
                const circle3 = bar3.querySelector('.coin-eth');
                updateCircle(circle1, bar1Value, 10000, 40000);
                updateCircle(circle2, bar2Value, 100, 500);
                updateCircle(circle3, bar3Value, 800, 3000);

                // Set the background color of each bar based on its value
                const bar1Color = getBarColor(bar1Value, 10000, 40000);
                const bar2Color = getBarColor(bar2Value, 100, 500);
                const bar3Color = getBarColor(bar3Value, 800, 3000);
                bar1.style.backgroundColor = bar1Color;
                bar2.style.backgroundColor = bar2Color;    
                bar3.style.backgroundColor = bar3Color;
                
                function getBarColor(value, min, max) {
                    const range = max - min;
                    const midpoint = min + (range / 2);
                    let color;

                    if (value < midpoint) {
                        const lowerRange = range / 2;
                        const percent = (value - min) / lowerRange;
                        color = `rgb(255, ${Math.round(255 * percent)}, ${Math.round(255 * percent)})`;
                    } else {
                        const upperRange = range / 2;
                        const percent = (max - value) / upperRange;
                        color = `rgb(${Math.round(255 * percent)}, 255, ${Math.round(255 * percent)})`;
                    }

                    return color;
                }

            
                function updateCircle(circle, value, min, max) {
                    const barHeight = circle.parentElement.clientHeight;
                    const range = max - min;
                    const valuePosition = barHeight - (barHeight * (value - min) / range);


                    // Set the position of the circle based on the current value
                    circle.style.top = `${valuePosition}px`;
                    
                    // Set the position of the value based on the current value
                    const valueElement = circle.nextElementSibling;
                    valueElement.style.top = `${valuePosition}px`;
                }
            })
// =================================================== //
// Connect to our stock data server (WebSocket)
const socket = new WebSocket("ws://127.0.0.1:8000/ws");

// Store previous prices so we can compare changes
let previousPrices = {};

// When we receive data from server
socket.onmessage = function (event) {

    // Convert incoming data (text) into real JS object
    const stocks = JSON.parse(event.data);

    let html = "";

    // Loop through each stock item
    stocks.forEach(stock => {

        let arrow = "";        // shows up or down symbol
        let colorClass = "";   // controls text color

        // Check if we already have a previous price for this stock
        if (previousPrices[stock.ticker] !== undefined) {

            // If price increased
            if (stock.price > previousPrices[stock.ticker]) {
                arrow = "▲";
                colorClass = "up";
            }
            // If price decreased
            else if (stock.price < previousPrices[stock.ticker]) {
                arrow = "▼";
                colorClass = "down";
            }
        }

        // Save current price for next comparison
        previousPrices[stock.ticker] = stock.price;

        // Create HTML card for each stock
        html += `
            <div class="card">
                <h2>${stock.ticker}</h2>

                <p class="${colorClass}">
                    ${arrow} ₹${stock.price}
                </p>
            </div>
        `;
    });

    // Show last update time on screen
    document.getElementById("last-updated").innerHTML =
        "Last Updated: " + new Date().toLocaleTimeString();

    // Put all stock cards into the page
    document.getElementById("stocks").innerHTML = html;
};

// When connection is successfully opened
socket.onopen = function () {
    document.getElementById("status").innerHTML =
        "🟢 Connected";
};

// When connection is lost/closed
socket.onclose = function () {
    document.getElementById("status").innerHTML =
        "🔴 Disconnected";
};
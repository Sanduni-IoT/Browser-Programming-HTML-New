const cityText = document.getElementById("city")
const temperatureText = document.getElementById("temperature")
const windText = document.getElementById("wind")
const output = document.getElementById("output")

function log(message) {
    output.textContent += message + "\n"
}

function clearOutput() {
    output.textContent = ""
}

document.getElementById("btnLoadWeather").onclick = loadWeather

async function loadWeather() {
    clearOutput()

    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=62.8924&longitude=27.6770&current=temperature_2m,wind_speed_10m"
        )

        // check if request is successful
        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status)
        }

        // convert to JSON
        const data = await response.json()

        console.log(data) // for debugging

        // read values from JSON
        const temperature = data.current.temperature_2m
        const wind = data.current.wind_speed_10m

        // update UI
        cityText.textContent = "Kuopio"
        temperatureText.textContent = temperature + " °C"
        windText.textContent = wind + " km/h"

        // console output
        log("City: Kuopio")
        log("Temperature: " + temperature + " °C")
        log("Wind Speed: " + wind + " km/h")

    } catch (error) {
        // error handling
        log("Error: " + error.message)
    }
}
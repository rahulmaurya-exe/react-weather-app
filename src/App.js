import React, { useState, useEffect } from 'react'

function App() {
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/'
  const API_KEY = '50654ea7cac3198de33969ca0d517cf3'

  const [query, setQuery] = useState('Lucknow')
  const [weather, setWeather] = useState({})

  const getData = () => {
    fetch(`${BASE_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result)
        setQuery('')
      })
  }

  useEffect(() => {
    getData()
  }, [])

  const search = (e) => {
    console.log('search called')
    if (e.key === 'Enter') {
      getData()
    }
  }

  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div
      className={
        weather.main !== undefined
          ? weather.main.temp > 16
            ? 'app-body warm'
            : 'app-body cold'
          : 'app-body'
      }
    >
      <div
        className={
          weather.main !== undefined
            ? weather.main.temp > 16
              ? 'app warm'
              : 'app'
            : 'app'
        }
      >
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {weather.main !== undefined ? (
            <div>
              <div className="location-box">
                <div className="location">
                  {weather.name},{weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)} ºc</div>
                <div className="weather">{weather.weather[0].main}</div>
                {console.log(weather.weather[0].icon)}
                <img
                  className="weather-icon"
                  src={
                    'http://openweathermap.org/img/w/' +
                    weather.weather[0].icon +
                    '.png'
                  }
                />
              </div>
            </div>
          ) : (
            ''
          )}
        </main>
      </div>
    </div>
  )
}

export default App

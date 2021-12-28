import React, { useState, useEffect } from 'react'
import axios from 'axios'

function langHelper(obj){
  let arr = []
  for (let lan in obj){
    arr.push(obj[lan])
  }
  return arr
}

const CountryList = (props) => {
  return (
    <div>
      {props.listOfCountries.map((country) => 
        <div key={country.name.common}  >
          {country.name.common}
          <button onClick={() => props.clickShow(country.name.common)}>
            show
          </button>
        </div>
      )}
    </div>
  )
}

const Weather = (props) => {
  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${props.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])
  console.log(weather)

  if(weather.length===0){
    console.log(weather)
    return(
      <div>
        loading...
      </div>
    )
  }else{
  return (
    <div>
      <h2>Weather in {props.capital}</h2>
      <p><b>Temperature: </b>{weather.current.temperature} celcius</p>
      <img src={weather.current.weather_icons[0]} alt="weather"></img>
      <p><b>Wind: </b>{weather.current.wind_speed} mph in direction {weather.current.wind_dir}</p>
    </div>
  )
  }
}

const Country = ({cnt}) => {
  const cObj = cnt
  return(
    <div>
      <h1>{cObj.name.common}</h1>
      <p>Capital {cObj.capital[0]}</p>
      <p>Population {cObj.population}</p>
      <h2>Languages</h2>
      <ul>
        {langHelper(cObj.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={cObj.flags.png} alt="flag"></img>
      <Weather capital={cObj.capital[0]}/>
    </div>
  )
}

const Countries = (props) => {
  const listOfCountries = props.filtered

  if (listOfCountries.length>1 && listOfCountries.length<=10){
    return (
      <div>
          <CountryList listOfCountries={listOfCountries} clickShow={props.clickShow} />
      </div>
    )
  } else if (listOfCountries.length===1) {
    return (
      <div>
          <Country cnt={listOfCountries[0]} />
      </div>
    )
  }
  else if (listOfCountries.length===0) {
    return (
      <div>
          <p>No matches, specify another filter</p>
      </div>
    )
  }
  return (
    <div>
        <p>Too many matches, specify another filter</p>
     </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [showThis, setShowThis] = useState(false)
  const [showNum, setShowNum] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setShowThis(false)
  }

  const clickShow = (cN) => {
    setShowThis(true)
    setShowNum(cN)
  }

  const countriesToShow = !showThis 
  ? countries.filter( (element) => element.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  : countries.filter((element) => element.name.common === showNum)

  return (
    <div>
      <form >
        <div>find countries: <input value={newFilter} onChange={handleFilterChange} /></div>
      </form>
      <Countries filtered={countriesToShow} clickShow={clickShow}/>
    </div>
  )

}

export default App
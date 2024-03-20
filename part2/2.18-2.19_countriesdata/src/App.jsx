import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import Countries from "./components/Countries.jsx";
import Notification from "./components/Notification.jsx";
import Country from "./components/Country.jsx";

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})
  const [notificationMessage, setNotificationMessage] = useState('')
  const [filterCountryName, setFilterCountryName] = useState('')


  return (
    <div>
      <Filter filterCountryName={filterCountryName} setFilterCountryName={setFilterCountryName} setNotificationMessage={setNotificationMessage} setCountries={setCountries} setCountry={setCountry}/>
      <Notification message={notificationMessage} />
      <Countries countries={countries} setCountry={setCountry}/>
      <Country country={country} />
    </div>
  )
}

export default App
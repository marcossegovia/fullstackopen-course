import countriesService from '../services/countries.js'

const Filter = ({filterCountryName, setFilterCountryName, setNotificationMessage, setCountries, setCountry}) => {
  const handleFilterCountryNameChange = (event) => {
    const countryName = event.target.value;
    setNotificationMessage('')
    setCountries([])
    setCountry('')
    setFilterCountryName(countryName)
    countriesService.getAll(countryName)
      .then(
        filteredCountries => {
          if (filteredCountries.length > 10) {
            setNotificationMessage('Too many matches, specify another filter')
            return;
          }
          if (filteredCountries.length === 1) {
            setCountry(filteredCountries[0])
            return;
          }
          if (filteredCountries.length === 0) {
            setNotificationMessage('No results, please provide a different input')
          } else {
            setCountries(filteredCountries)
          }
        }
      )

  }

  return (
    <div>
      <p>find countries <input value={filterCountryName} onChange={handleFilterCountryNameChange}/></p>
    </div>
  )
}

export default Filter
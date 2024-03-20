const Country = ({country}) => {
  if (Object.keys(country).length === 0) {
    return null
  }
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <p>languages:</p>
      {console.log()}
      <ul>{Object.entries(country.languages).map(l => <li key={l[0]}>{l[1]}</li>)}</ul>
      <img src={country.flags.png}/>
    </div>
  )
}

export default Country
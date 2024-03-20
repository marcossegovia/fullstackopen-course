const Countries = ({countries, setCountry}) => {

  const displayCountry = country => {
    setCountry(country)
  }


  if (countries.length > 10) {
    return (
      <></>
    )
  }
  return (
    <div>
      {countries.map(c => {
          return (
            <><p key={c.cioc}>{c.name.common}</p><button onClick={() => displayCountry(c)}>show</button></>
          )
        }
      )}
    </div>
  )
}

export default Countries
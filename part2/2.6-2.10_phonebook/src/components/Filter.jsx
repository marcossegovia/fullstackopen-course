const Filter = ({filterName, setFilterName, persons, setPersonsFiltered}) => {
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
    setPersonsFiltered(persons.filter(p => p.name.includes(event.target.value)))
  }

  return (
    <div>
      <p>filter shown with <input value={filterName} onChange={handleFilterNameChange}/></p>
    </div>
  )
}

export default Filter
const PersonForm = ({newName, setNewName, newNumber, setNewNumber, persons, setPersons, filterName, setPersonsFiltered}) => {
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(p => p.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newContacts = persons.concat(newContact);
    setPersons(newContacts)
    setPersonsFiltered(newContacts.filter(p => p.name.includes(filterName)))
    setNewName('')
    setNewNumber('')
  }

  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button onClick={addContact} type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
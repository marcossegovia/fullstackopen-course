import personService from '../services/persons'

const PersonForm = (
  {
    newName,
    setNewName,
    newNumber,
    setNewNumber,
    persons,
    setPersons,
    filterName,
    setPersonsFiltered,
    setNotificationMessage
  }) => {
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
    const existingContacts = persons.filter(p => p.name === newName);
    if (existingContacts.length > 0) {
      const existingContact = existingContacts[0]
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService.update(existingContact.id, {...existingContact, number: newContact.number})
          .then(updatedContact => {
              const updatedContacts = persons.map(p => p.id !== updatedContact.id ? p : updatedContact)
              setPersons(updatedContacts)
              setPersonsFiltered(updatedContacts.filter(p => p.name.includes(filterName)))
              setNewName('')
              setNewNumber('')
              setNotificationMessage(
                {value: `Contact '${newContact.name}' was updated in the server`, type: 'success'}
              )
              setTimeout(() => {
                setNotificationMessage({})
              }, 5000)
            }
          )
          // Added after 3.19
          .catch(error => {
            setNotificationMessage({value: error.response.data.error, type: 'error'})
          })
      }

    } else {
      personService.create(newContact)
        .then(createdContact => {
          const updatedContacts = persons.concat(createdContact);
          setPersons(updatedContacts)
          setPersonsFiltered(updatedContacts.filter(p => p.name.includes(filterName)))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            {value: `Contact '${newContact.name}' was added to the server`, type: 'success'}
          )
          setTimeout(() => {
            setNotificationMessage({})
          }, 5000)
        })
        // Added after 3.19
        .catch(error => {
          setNotificationMessage({value: error.response.data.error, type: 'error'})
        })
    }

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
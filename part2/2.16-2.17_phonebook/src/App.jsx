import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from './services/persons'
import Notification from "./components/Notification.jsx";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])
  const [notificationMessage, setNotificationMessage] = useState({})

  useEffect(() => {
    personService.getAll()
      .then((data) => {
        console.log(data)
        setPersons(data)
        setPersonsFiltered(data)
        setFilterName('')
      })
  }, []);


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} persons={persons}
              setPersonsFiltered={setPersonsFiltered}/>
      <h3>Add a new</h3>
      <Notification message={notificationMessage}/>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
                  persons={persons} setPersons={setPersons} filterName={filterName}
                  setPersonsFiltered={setPersonsFiltered} setNotificationMessage={setNotificationMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} personsFiltered={personsFiltered} setPersons={setPersons}
               setPersonsFiltered={setPersonsFiltered} setNotificationMessage={setNotificationMessage}/>
    </div>
  )
}

export default App
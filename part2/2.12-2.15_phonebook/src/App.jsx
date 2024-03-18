import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])

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
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
                  persons={persons} setPersons={setPersons} filterName={filterName}
                  setPersonsFiltered={setPersonsFiltered}/>
      <h2>Numbers</h2>
      <Persons persons={persons} personsFiltered={personsFiltered} setPersons={setPersons}
               setPersonsFiltered={setPersonsFiltered}/>
    </div>
  )
}

export default App
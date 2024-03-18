import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import PersonForm from "./components/PersonForm.jsx";
import Persons from "./components/Persons.jsx";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [personsFiltered, setPersonsFiltered] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then((response) => {
        console.log(response)
        setPersons(response.data)
        setPersonsFiltered(response.data)
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
      <Persons personsFiltered={personsFiltered}/>
    </div>
  )
}

export default App
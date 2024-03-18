import personService from '../services/persons'

const Persons = ({persons, personsFiltered, setPersonsFiltered, setPersons}) => {
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteById(person.id)
        .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
            setPersonsFiltered(personsFiltered.filter(p => p.id !== person.id))
          }
        )
    }
  }

  return (
    <div>
      {personsFiltered.map(person => <p key={person.name}>{person.name} {person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
      </p>)
      }
    </div>
  )
}

export default Persons
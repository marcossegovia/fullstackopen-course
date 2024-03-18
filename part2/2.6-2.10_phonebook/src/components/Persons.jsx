const Persons = ({personsFiltered}) => {
  return (
    <div>
      {personsFiltered.map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </div>
  )
}

export default Persons
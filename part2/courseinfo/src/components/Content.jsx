import Part from "./Part.jsx";

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map(
          (data) =>
            <Part key={data.id} name={data.name} exercises={data.exercises}/>
        )
      }
    </>
  )
}

export default Content
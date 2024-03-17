import {useState} from "react";

const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map(
          (data) =>
            <Part key={data.name} name={data.name} exercises={data.exercises}/>
        )
      }
    </>
  )
}

const Total = ({parts}) => {
  return (
    <p>
      Number of exercises {parts.map(p => p.exercises).reduce((sum, num) => sum + num)}
    </p>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}


const App = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)

  const decreaseByOne = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      <div>{counter}</div>
      <Button onClick={increaseByOne} text='Increase counter!' />
      <Button onClick={decreaseByOne} text='Descrease counter!' />
      <Button onClick={reset} text='Reset' />
    </div>
  )
}

export default App

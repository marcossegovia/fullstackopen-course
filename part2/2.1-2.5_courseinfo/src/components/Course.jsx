import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course = ({course}) => {
  return (
    <div>
      <Header value={course.name}/>
      <Content parts={course.parts}/>
      <p>total of {course.parts.reduce((sum, part) => sum = sum + part.exercises, 0)} exercises</p>
    </div>
  )
}

export default Course

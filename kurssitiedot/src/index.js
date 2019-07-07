import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
    return(
        <div>
            <li>
                {course.name} {course.exercises}
            </li>
        </div>
        
        
    )
}

const App = () =>{

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            }, 
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3 
            },
            {
                name: "Added new part",
                exercises: 11,
                id: 4
            }
            
        ]
    
    } 
    
    const part = course.parts.map(item => <Course
        key = {item.id}
        course = {item}
    />)
    
    let sum = 0
    const total = course.parts.reduce((s, p) => {
        return s + p.exercises
    }, sum)

    return(
        
        <div>
            <h2>{course.name}</h2>
            {part}
            <p><b>Total of {total} exercises</b></p>
        </div>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
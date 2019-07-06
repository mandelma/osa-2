import React from 'react';
import ReactDOM from 'react-dom';

const Course = ({course}) => {
    return(
        <li>{course.name} {course.exercises}</li>
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
            
        ]
    
    } 
    const part = course.parts.map(item => <Course
        key = {item.id}
        course = {item}
    />)
    
    return(
        
        <div>
            <h2>{course.name}</h2>
            {part}
        </div>
        
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

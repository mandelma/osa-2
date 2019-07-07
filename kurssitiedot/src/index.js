import React from 'react';
import ReactDOM from 'react-dom';

import Course from "./Course"
import course from "./data"
const App = () =>{

    
    
    const part = course.map(item => <Course
        key = {item.parts.map(inx => inx.id)}
        name = {item.name}
        parts = {item.parts}
        total = {item.parts.reduce((s, p) => {
            return s + p.exercises
        }, 0)}
    />)

    return( 
        <div>
            <h1>Web development curriculum</h1>
            {part}
        </div>   
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
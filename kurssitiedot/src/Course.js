import React from "react"

const Course = ({parts, name, total}) => {
    
    return(
        <div>
            <h2>{name}</h2>
            {parts.map(item => <li key = {item.id}>
            {item.name} {item.exercises}</li>)}
            <p><b>Total of {total} exercises</b></p><br/>
        </div>
    )
}

export default Course
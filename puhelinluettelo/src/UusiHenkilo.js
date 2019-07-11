import React from "react"

const UusiHenkilo = (props) => {
    return(
        <div>
            <form onSubmit = {props.addName}>
                <div>
                name: <input 
                    value = {props.newName}  
              
                    onChange = {props.nameHandler}
                /><br/>
                number: <input
                    value = {props.newNumber}
              
                    onChange = {props.numberHandler}
                />
                </div>
                <div>
                    <button type = "submit">
                        add
                    </button>
                </div>
            </form>
        </div>
    )
} 

export default UusiHenkilo
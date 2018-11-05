
import React from 'react';

const Option = (props)=>{
    return(
        <div className = "option">
            <p className = "option__text">{props.count}. {props.optionText}</p>
            <button className = "button button--link" onClick = {(e)=>{
                // if we do onClick = {props.handleDeleteOption} we console log out deleted
                // and the event object itself - we want to extract the actual option text and pass it up to the parent method
                props.handleDeleteSingle(props.optionText)
            }}>Remove</button>
        </div>
        
    )
}

export default Option;
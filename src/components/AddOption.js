import React from 'react';

export default class Add extends React.Component{
    state = {
        error: undefined
    };
    // still want to get form details so we want this functionality contained in this component
    handleAddOption = (e) =>{
        e.preventDefault();
        const option= e.target.elements.option.value.trim();
        // grabs return value of running function from parent and passes the data up to the parent
        const error = this.props.handleAddOption(option)
        this.setState(()=>({error: error}));  

        // clear input field if there isn't an error
        if(!error){
            e.target.elements.option.value = '';
        }
    }
    render(){
        return(
            <div>
            {this.state.error && <p className = "add-option-error">{this.state.error}</p>}
            <form className = "add-option" onSubmit = {this.handleAddOption}>
                <input className = "add-option__input" type = "text" name= "option"/> 
                <button className = "button">Add Item</button>
            </form>
            </div>
        )
    }
}
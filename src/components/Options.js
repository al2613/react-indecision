import React from 'react';
import Option from './Option';

const Options = (props)=>
    (
    <div>
        <div className = "widget-header">
        <h3 className = "widget-header__title">Your choices</h3>
        <button className = "button button--link" onClick = {props.handleDeleteOptions}>Remove All</button>
        </div>
        {props.options.length == 0 && <p className ="widget__message">Add an option to get started</p>}
        { 
            props.options.map((option, index)=>{
                return <Option key = {option} optionText = {option} count = {index + 1} handleDeleteSingle={props.handleDeleteSingle} />
           })
        }
    </div>
    )

//using bind ensures handleRemoveAll has the exact same 'this' binding as render has 
// class Options extends React.Component {
//     render(){
//         return(
//             <div>
//             <button onClick = {this.props.handleDeleteOptions}>Remove All</button>
//             { 
//                 this.props.options.map((option)=>{
//                     return <Option key = {option} optionText = {option} />
//                })
//             }
//             </div>
//         )
//     }
// }

export default Options;
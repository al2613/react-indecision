
// import isSenior, {isAdult, canDrink} from './utils.js';

// this entire file should really be in charge of bootstrapping our entire application
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

// makes header and footer render on every page
const Layout = (props)=>{
    return(
        <div>
            <p>Header</p>
            {props.children}
            <p>footer</p>
        </div>
    );
}

const template = (
    <div>
        <h1>Example title</h1>
    </div>
)

// class Option extends React.Component {
//     render(){
//         return(
//             <div>
//                 {this.props.optionText}
//             </div>
//         )
//     }
// }

// stateless functional components
// still allow for props
// const User = (props)=>{
//     return (
//         <div>
//             <p>Name:{props.name} </p>
//             <p>Age: </p>
//         </div>
//     );
// };

// ReactDOM.render(<Layout content = {template}/>, document.getElementById('app'))

// ReactDOM.render(<Layout><p>This is inline</p></Layout>, document.getElementById('app'))

ReactDOM.render(<IndecisionApp options = {["option 1", "option 2"]}/>, document.getElementById('app'))
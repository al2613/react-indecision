// let visibility = false;

// const toggleVisibility = ()=>{
//     visibility = !visibility;
//     render();
// }

// const render = ()=>{
//     const visibilityTemplate = (
//         <div>
//             <h1>Toggle to Show! </h1>
//             <input type="checkbox" name = "age"/> confirm you are over 18 
//             <button onClick = {toggleVisibility}>
//             {visibility? 'Hide details' : 'show details'}
//             </button>
//             {visibility && (
//                 <div>This is the text to display</div>
//             )}
//         </div>
//     );
//     ReactDOM.render(visibilityTemplate, document.getElementById('app'))
// };


// render();


class Visibility extends React.Component {

    constructor (props){
        super(props);
        this.toggleVisbility = this.toggleVisbility.bind(this);
        // intiially set state 
        this.state = {
            visibility: false
        };
    }

    toggleVisbility(){
        // allows us to manipulate state object
        // prevState is the state object before any changes have been applied
        this.setState((prevState)=>{
            return {
                visibility: !prevState.visbility 
            };
        });
    }

    render(){
        return (
            <div>
                <h1>Toggle to Show! </h1>
                <button onClick = {this.toggleVisibility}>
                {this.state.visibility? 'Hide details' : 'show details'}
                </button>
                {this.state.visibility && (
                    <div>This is the text to display</div>
                )}
            </div>
        )
    }
}



ReactDOM.render(<Visibility />, document.getElementById('app'))

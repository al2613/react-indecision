class IndecisionApp extends React.Component {
    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOption = this.handleAddOption.bind(this)
        this.handleDeleteSingle = this.handleDeleteSingle.bind(this)
        this.state = {
            // we've enabled indecisionApp to have options passed down - a way to configure the default state
            options: [] 
        };
    }
    // we mount a single instance of IndecisionApp
    componentDidMount(){

        try {
            // get item from local storage(json format by default)
            const json = localStorage.getItem('options');
            // need to parse into regular js object so we can set state
            const options = JSON.parse(json);
            if (options){
                // pass in the updated array only if options is valid
                this.setState(()=>({options: options}))
            }

        } catch (e){
            // do nothing
        }

    }
    
    // we can access previous props and previous state through the parameters
    componentDidUpdate(prevProps, prevState){
        if(prevState.options.length !== this.state.options.length){
            console.log('saving data')
            const json = JSON.stringify(this.state.options)
            console.log(json)
            localStorage.setItem('options',json)
        }

    }

    // when removing individual options 
    componentWillUnmount(){
        console.log('component unmounted')
    }
    // define methods that gets passed down from parent-child. Then the child can call that function
    handleAddOption(option){
        if(!option){
            return 'enter valid value to add item'
        }
        else if (this.state.options.indexOf(option) > -1){
            return 'option already exists'
        }

        this.setState((prevState)=>({
            options: prevState.options.concat([option])
        }));
    }

    handleDeleteOptions (){
        // need to wrap empty obj in () or else JS will think it's an function bracket
        this.setState(()=>({options: []}));
    }

    // new method for taking in option to be deleted and useing setstate to delete
    // use filter method to remove chosen item. filter where there is no match 
    handleDeleteSingle(optionToRemove){
        this.setState((prevState)=>({
            options: prevState.options.filter((option)=>{
                return optionToRemove !== option;
            })
        }))
    }

    handlePick(){
        const randomNum = Math.floor(Math.random() * this.state.options.length); 
        const option = this.state.options[randomNum]
        alert(option);
    }

    render() {
       const subtitle = 'put your life in the hands of a computer';

      return (
        <div>
          <Header subtitle = {subtitle}/>
          <Action hasOptions = {this.state.options.length > 0} handlePick = {this.handlePick}/>
          <Options options = {this.state.options} handleDeleteOptions= {this.handleDeleteOptions} handleDeleteSingle= {this.handleDeleteSingle}/>
          <Add handleAddOption = {this.handleAddOption} />
        </div>
      );
    }
  }

const Header = (props)=>{
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
  }

Header.defaultProps= {
    title: 'Indecision'
}

const Action = (props)=>{
    return (
        <div>
            <button onClick = {props.handlePick} disabled = {!props.hasOptions}>What should I do?</button>
        </div>
    )
}

const Options = (props)=>{
    return(
        <div>
        <button onClick = {props.handleDeleteOptions}>Remove All</button>
        {props.options.length == 0 && <p>'Add an option to get started'</p>}
        { 
            props.options.map((option)=>{
                return <Option key = {option} optionText = {option} handleDeleteSingle={props.handleDeleteSingle} />
           })
        }
        </div>
    )
}
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


const Option = (props)=>{
    return(
        <div>
            {props.optionText}
            <button onClick = {(e)=>{
                // if we do onClick = {props.handleDeleteOption} we console log out deleted
                // and the event object itself - we want to extract the actual option text and pass it up to the parent method
                props.handleDeleteSingle(props.optionText)
            }}>Remove</button>
        </div>
        
    )
}
// class Option extends React.Component {
//     render(){
//         return(
//             <div>
//                 {this.props.optionText}
//             </div>
//         )
//     }
// }

class Add extends React.Component{
    constructor(props){
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this)
        // introduce error handling
        this.state = {
            error: undefined
        }
    }
    
    // still want to get form details so we want this functionality contained in this component
    handleAddOption(e){
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
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit = {this.handleAddOption}>
                <input type = "text" name= "option"/> 
                <button>Add Item</button>
            </form>
            </div>
        )
    }
}

// stateless functional components
// still allow for props
const User = (props)=>{
    return (
        <div>
            <p>Name:{props.name} </p>
            <p>Age: </p>
        </div>
    );
};

ReactDOM.render(<IndecisionApp options = {["option 1", "option 2"]}/>, document.getElementById('app'))
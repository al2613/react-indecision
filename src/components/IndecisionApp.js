import React from 'react';
import Add from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {

    state = {
        options: [],
        // for modal purposes
        selectedOption: undefined
    };
    // constructor(props){
    //     super(props);
    //     this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    //     this.handlePick = this.handlePick.bind(this)
    //     this.handleAddOption = this.handleAddOption.bind(this)
    //     this.handleDeleteSingle = this.handleDeleteSingle.bind(this)
    //     this.state = {
    //         // we've enabled indecisionApp to have options passed down - a way to configure the default state
    //         options: [] 
    //     };
    // }

        // define methods that gets passed down from parent-child. Then the child can call that function
    handleAddOption = (option) => {
        if(!option){
            return 'enter valid value to add item'
        }
        else if (this.state.options.indexOf(option) > -1){
            return 'option already exists'
        }

        this.setState((prevState)=>({
            options: prevState.options.concat([option])
        }));
    };

    handleDeleteOptions = ()=>{
        // need to wrap empty obj in () or else JS will think it's an function bracket
        this.setState(()=>({options: []}));
    };

    // new method for taking in option to be deleted and useing setstate to delete
    // use filter method to remove chosen item. filter where there is no match 
    handleDeleteSingle = (optionToRemove)=>{
        this.setState((prevState)=>({
            options: prevState.options.filter((option)=>{
                return optionToRemove !== option;
            })
        }))
    };

    handlePick = () =>{
        const randomNum = Math.floor(Math.random() * this.state.options.length); 
        const option = this.state.options[randomNum]
        this.setState(()=>({selectedOption: option}));
    };

    handleClearSelected = ()=>{
        this.setState(()=>({selectedOption: undefined}));
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

    render() {
       const subtitle = 'put your life in the hands of a computer';

      return (
        <div>
          <Header subtitle = {subtitle}/>
          <div className = "container">
            <Action hasOptions = {this.state.options.length > 0} handlePick = {this.handlePick}/>
            <div className= "widget">
                <Options options = {this.state.options} handleDeleteOptions= {this.handleDeleteOptions} handleDeleteSingle= {this.handleDeleteSingle}/>
                <Add handleAddOption = {this.handleAddOption} />
            </div>
          </div>
          <OptionModal selectedOption = {this.state.selectedOption} handleClearSelected = {this.handleClearSelected}/>
        </div>
      );
    }
  }
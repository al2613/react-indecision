class Counter extends React.Component {

    constructor (props){
        super(props);
        this.addOne = this.addOne.bind(this);
        this.removeOne = this.removeOne.bind(this);
        this.reSet= this.reSet.bind(this);
        // intiially set state 
        this.state = {
            count: 0,
            name: '',
        };
    }

    componentDidMount(){

        try {
            // get item from local storage(json format by default)
            const stringCount = localStorage.getItem('count');
            const count = parstInt(stringCount,10)
            // need to parse into regular js object so we can set state
            if (!isNaN(count)){
                // pass in the updated array only if options is valid
                this.setState(()=>({count: count}))
            }

        } catch (e){
            // do nothing
        }

    }
    
    // we can access previous props and previous state through the parameters
    componentDidUpdate(prevProps, prevState){
            if (prevState.count !== this.state.count){
            localStorage.setItem('count',this.state.count)
        }
    }

    // when removing individual options 
    componentWillUnmount(){
        console.log('component unmounted')
    }

    addOne(){
        // allows us to manipulate state object
        // prevState is the state object before any changes have been applied
        this.setState((prevState)=>{
            return {
                count: prevState.count + 1
            };
        });
    }

    removeOne(){
        this.setState((prevState)=>{
            return {
                count: prevState.count - 1
            };
        });
    }

    reSet(){
        this.setState(()=>{
            return {
                count: 0
            };
        });
    }

    render(){
        return (
            <div>
                <h1>Count: {this.state.count} </h1>
                <button onClick = {this.addOne}>+1</button>
                <button onClick = {this.removeOne}>-1</button>
                <button onClick = {this.reSet}>Reset</button>
            </div>
        )
    }
}


ReactDOM.render(<Counter />, document.getElementById('app'))

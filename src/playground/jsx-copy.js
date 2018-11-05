console.log('app.js is running!')

const appObject = {
    title: "Hello, world",
    subtitle: "Have trouble deciding?",
    options: [] 
}

const onFormSubmit = (e)=>{
    e.preventDefault();
    const option= e.target.elements.option.value;

    if (option){
        appObject.options.push(option);
        e.target.elements.option.value= '';
        renderCounter()
    }

}

const onMakeDecision = ()=>{
    const randomNum = Math.floor(Math.random() * appObject.options.length); 
    const option = appObject.options[randomNum]
    alert(option);

}

let user = {
    name:'Annette',
    age: '26',
    location: 'NYC'
};

// conditional rendering
// if there is no location - do nothing 
// else inject location adding in paragraph tags
// if value is undefined, nothing will show  
function getLocation (location){
    if (location) {
        return <p>location: {location} </p>;
    } else{
        return undefined;
    }
}

// have single JS expression that calls getLocation passing in user location
// terenary expression to evaluate truthy/falsy conditions
// Using logical and operators 
let templateNew = (
    <div>
        <h1>{user.name ? user.name: 'Anonymous'}</h1>
        {user.age >= 18 && <p>Age: {user.age}</p>}
        {getLocation(user.location)}
    </div>
);

let count = 0;
const addOne = ()=>{
    count++;
    console.log('addone')
    renderCounter()    
};
const minusOne=()=>{
    count--;
    if (count < 0) {
        alert ("error - cannot decrease anymore")
        counter = 0;
    }
    renderCounter()
    console.log('minusone')
};
const reset = ()=>{
    count = 0;
    renderCounter() 
    console.log('reset')
}

const appRoot = document.getElementById("app")

const renderCounter = ()=> {
    // const templateTwo = (
    //     // onClick function could technically be written inline but better to reference a function 
    //     <div>
    //         <h1>Count: {count}</h1>
    //         <button id ="my-id" className = "button" onClick = {addOne}>+1</button>
    //         <button id ="my-id" className = "button" onClick = {minusOne}>-1</button>
    //         <button id ="my-id" className = "button" onClick = {reset}>reset</button>
    //     </div>

    // );
    const numbers = [55,101,1000]
    let template = (
        <div>
            <h1>{appObject.title}</h1>
            {appObject.subtitle && <p>Subtitle: {appObject.subtitle}</p>}
            <p>{appObject.options.length > 0 ? "Here are your options": 'No Options'}</p>
            <button disabled = {appObject.options.length == 0 ? true: false} onClick = {onMakeDecision}>What should I do?</button>
            <ol>
                {appObject.options.map((option)=>{
                    return <li key = {option}>{option}</li>
                })}
            </ol>
            <form onSubmit = {onFormSubmit}>
                <input type = "text" name = "option"/>
                <button>Add</button>
            </form> 

        </div>
    );


    ReactDOM.render(template, appRoot)
}

renderCounter();

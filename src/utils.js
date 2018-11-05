//create utility function
// each file has access to default export
//console.log('utils is loading')

// const square = (x) => x * x;

// const add = (a,b)=> a+b;

const isAdult = (age)=> age > 18 ? true: false; 
const canDrink = (age)=> age > 21? true: false;
const isSenior = (age)=> age > 65? true: false;

export {isAdult, canDrink, isSenior as default};
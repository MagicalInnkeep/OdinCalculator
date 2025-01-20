//--------------------------------
//      Variables
//--------------------------------

let varA='';
let varB='';
let varFunction=''; 
let varFunctionDisplay=''
let result=0;
//Scope is tracker to know if we are filling in A,function or B.
// 0: A; 1: B
let currentScope=0; 
let calcScreen = document.querySelector(".calcWindow");

//--------------------------------
//      Functions
//--------------------------------

function sum(a,b){
    return a+b;
}

function minus(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function modulo(a,b){
    return Math.modulo(a,b);
}

function calculate(){
    // calculates the function which lives in the global scope named 'window'. 
    switch(currentScope){
        case 0: result = varA; 
                break;
        case 1: 
                if( varB==''){ result = varA}
                else {
                    result = window[varFunction](parseFloat(varA),parseFloat(varB)); 
                }
                break;
        default: result = "SYNTAX ERROR";
                break;
    }

    // Console display to debug
    console.log(`${varFunction}(${varA},${varB}) returns: ${result}`);

    //Update Window
    updateWindowResult()

    // Clean variables
    cleanVar();
}

function cleanVar(){
        // Resets the variables
        varA ='';
        varB ='';
        varFunction ='';
        currentScope = 0;
}

function clean(){
    //clears the screen
    calcScreen.replaceChildren();
}

function numberPressed(currValue){
    if(currentScope==0) {
        varA=varA+currValue;
    } 
    else if(currentScope==1){
        varB=varB+currValue;
    }
    console.log(`A: ${varA} | B: ${varB}`);
    updateWindowVar();
}

function deletePressed(){
    if(currentScope==0) {
        varA = varA.slice(0,-1);
    } 
    else if(currentScope==1){
        varB = varB.slice(0,-1);
    }
    console.log(`A: ${varA} | B: ${varB}`);
    updateWindowVar();
}

function updateWindowVar(){
    clean();
    const variables = document.createElement("p");
    variables.textContent=`${varA} ${varFunctionDisplay} ${varB}`
    calcScreen.appendChild(variables)
}

function updateWindowResult(){
    updateWindowVar();
    const resultScr = document.createElement("p");
    resultScr.textContent=`= ${result}`
    calcScreen.appendChild(resultScr)
}

//--------------------------------
//      Button Events
//--------------------------------

const calcButtons = document.querySelector(".calcButtons");

calcButtons.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id) {
        case "AC":          
            clean();
            cleanVar();
            break;
        case "brackets": 
            break;
        case "modulo":      
            varFunction=target.id; 
            varFunctionDisplay='%';
            updateWindowVar()
            currentScope=1;
            break;
        case "divide":      
            varFunction=target.id;
            varFunctionDisplay="/";
            updateWindowVar()
            currentScope=1; 
            break;
        case "number7": 
            numberPressed("7");
            break;
        case "number8":
            numberPressed("8");
            break;
        case "number9":
            numberPressed("9");
            break;
        case "multiply":    
            varFunction=target.id; 
            varFunctionDisplay='*';
            updateWindowVar()
            currentScope=1;
            break;
        case "number4":
            numberPressed("4");
            break;
        case "number5":
            numberPressed("5");
            break;
        case "number6":
            numberPressed("6");
            break;
        case "minus": 
            varFunction=target.id; 
            varFunctionDisplay='-';
            updateWindowVar()
            currentScope=1;
            break;
        case "number1":
            numberPressed("1");
            break;
        case "number2":
            numberPressed("2");
            break;
        case "number3":
            numberPressed("3");
            break;
        case "sum": 
            varFunction=target.id; 
            varFunctionDisplay='+';
            updateWindowVar()
            currentScope=1;
            break;
        case "number0":
            numberPressed("0");
            break;
        case "decimal":
            numberPressed(".");
            break;
        case "delete":
            deletePressed();
            break;
        case "equal":
            calculate();
            break;
        default: console.log("what?")
    }
    });
document.getElementById("screen").disabled = true;

const elemFun = (x) => document.getElementById(x).getAttribute("value");
const calcScreen = (x) => document.getElementById("screen").value+=x;
const clearScreen = () => document.getElementById("screen").value="";
const getScreen = () => Number(document.getElementById("screen").value);
const calcFunction = (x) =>{ document.getElementById("screen").value=x }; 

let answer = null;
let screenValue;
let lastUserInput;
let operator;

let fixedValue = 0;
let fixedAmnt = 0;

// used to make sure we can only have 1 decimal in a value.
let floating = false;
let floatNext = false;
let newValue = false;

let opSet = false;
let opFirstButton = false;

// clear all user input and put calc in blank state
clearAll = () => {
  clearScreen();
  answer = null;
  screenValue = 0;
  lastUserInput = 0;
  operator = "";
  fixedValue = 0;
  fixedAmnt = 0;
  floating = false;
  floatNext = false;
  newValue = false;
  opSet = false;
  opFirstButton = false;
};

clearEntry = () => {
  entry = document.getElementById("screen").value

  if(entry.slice(-2, -1) === "." ) {
    newValue = true;
    calcFunction(entry.substring(0, entry.length-2));
  } 
  else {
    calcFunction(entry.substring(0, entry.length-1));
  }

};

// calc buttons functions
// which I realized became kind of pointless, but nice exercise none the less.
const calcButton0 = elemFun("numValue0");
const calcButton1 = elemFun("numValue1");
const calcButton2 = elemFun("numValue2");
const calcButton3 = elemFun("numValue3");
const calcButton4 = elemFun("numValue4");
const calcButton5 = elemFun("numValue5");
const calcButton6 = elemFun("numValue6");
const calcButton7 = elemFun("numValue7");
const calcButton8 = elemFun("numValue8");
const calcButton9 = elemFun("numValue9");
const dotButton = elemFun("numValueDot");



// clear if you pressed an operator button but no numbers yet.
opClear = () => {
  if(opFirstButton) {
    clearScreen();
    opFirstButton = false
  }
}

// function to check if a float is set to be made.
// also, if fixed value for current number being pressed is higher than set fixed amount
// increase fixed amount.
const checkFloat = (calcButton) => {
  if(floatNext) {
    fixedValue = 0;
    calcScreen(`.${calcButton}`)
    floatNext = false;
    fixedValue++;
  } 
  else if(floating) {
    calcScreen(calcButton);
    fixedValue++;
  }
  else {
    calcScreen(calcButton);
  };

  fixedAmnt = fixedValue > fixedAmnt ? fixedValue : fixedAmnt;
};

// number functions
// aware I could just put a string number on checkFloat, but wanted to also practice
// pulling values from HTML. But does make the elemFun pointless though.

numberInput = (event) => {opClear(); checkFloat(event);};
numberInput0 = () => { opClear(); checkFloat(calcButton0); }; 
numberInput1 = () => { opClear(); checkFloat(calcButton1); };
numberInput2 = () => { opClear(); checkFloat(calcButton2); };
numberInput3 = () => { opClear(); checkFloat(calcButton3); };
numberInput4 = () => { opClear(); checkFloat(calcButton4); };
numberInput5 = () => { opClear(); checkFloat(calcButton5); };
numberInput6 = () => { opClear(); checkFloat(calcButton6); };
numberInput7 = () => { opClear(); checkFloat(calcButton7); };
numberInput8 = () => { opClear(); checkFloat(calcButton8); };
numberInput9 = () => { opClear(); checkFloat(calcButton9); };

// function to create floating numbers and check if current number is already floating.
dotInput = () => { 
  opClear(); 
  if(!floating) {
    floating = true;
    floatNext = true;
  } 
  else if (floating && newValue) {
    newValue = false;
    floatNext = true;
  } 
};

// take off any zeros at end of value on screen and adjust fixedAmnt.
const fixedAmntValue = (number) => {
  if(floating) {
    numberArray = number.toString().split("")
    let i = 0;
    let l = numberArray.length;
    for( i = l-1; i >= 0; i--) {
      if(l[i] === "0") {
        fixedAmnt--
      }
      else if(fixedAmnt < 0) {
        return Number(number.toFixed(0));
      }
      else if(l[i] != "0" ) {
        return Number(number.toFixed(fixedAmnt));
      }
    }
  }
  else {
    return number;
  }
}

// operator functions

opFunction = () => {

  if(getScreen() === NaN) {
    calcScreen(answer);
  }

  if(opFirstButton === true) {
    screenValue = lastUserInput;
  } else if(opFirstButton === false && answer) {
    screenValue = Number(answer);
    lastUserInput = fixedAmntValue(getScreen());
  }

  switch(operator) {

    case "+":

      if(opFirstButton === true) {
        answer = getScreen() + lastUserInput;
      } else {
        answer = screenValue + getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(fixedAmntValue(answer));

      break;
    
    case "/":

      if(opFirstButton === true) {
        answer = getScreen() / lastUserInput;
      } else {
        answer = screenValue / getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(fixedAmntValue(answer));
      
      break;

    case "*":

      if(opFirstButton === true) {
        answer = getScreen() * lastUserInput;
      } else {
        answer = screenValue * getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(fixedAmntValue(answer));
      
      break;

    case "-":

      if(opFirstButton === true) {
        answer = getScreen() - Math.abs(lastUserInput);
      } else {
        answer = screenValue - getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(fixedAmntValue(answer));

      break;

    }

  opFirstButton = true;

};

const inputFunction = (Op) => {

  floatNext = false;
  
  if(opSet===true && opFirstButton===true ){
    operator = Op
  }
  else if(opSet===true && opFirstButton===false) {
    opFunction();
  } 
  else if(opSet === false) {
    screenValue = fixedAmntValue(getScreen());
    lastUserInput = Number(screenValue);
    opSet = true;
    opFirstButton = true;
  }

  operator = Op;
  newValue = true;
}

opInputAdd = () => inputFunction("+");

opInputSub = () => inputFunction("-");

opInputMult = () => inputFunction("*");

opInputDiv = () => inputFunction("/");

opEqual = () => {
  if(opSet === false) {
  }
  else if(opSet===true && opFirstButton===true && answer===null) {
  } 
  else if(opSet === true) {
    opFunction();
  }
}

window.addEventListener("keydown", function(event) {
  let input = event.key;

  switch(input) {

    case "Delete":
      clearAll();
      break;

    case "Backspace":
      clearEntry();
      break;

    case "+":
      opInputAdd();
      break;

    case "-":
      inputFunction("-");
      break;

    case "*":
      inputFunction("*");
      break;

    case "/":
      inputFunction("/");
      break;

    case "Enter":
      opEqual();
      break;

    case ".":
      dotInput();
      break;

    default:
      numberInput(input);

  }

}, true);

// I wrote this function remembering calculators incorrectly thinking that everytime you 
// hit an operator without putting in another value, it would just keep adding/sub/div/mult
// the last value put in, but I believe that is only true for the "equal" button.
// It did work though.

// function for different operator inputs
// const inputFunction = (Opa, Opb, Opc, Opd, LUIx, LUIy) => {
  
//   if(opSet===true && (operator == Opa || operator == Opb) ){
//     lastUserInput = LUIx;
//     opFunction();
//   }
//   else if(opSet===true && operator == Opc) {
//     lastUserInput = LUIy;
//     opFunction();
//   } 
//   else if(opSet === true) {
//     opFunction();
//   }
//   else if(opSet === false) {
//     screenValue = getScreen();
//     lastUserInput = screenValue;
//     opSet = true;
//     opFirstButton = true;
//   }

//   operator = Opd;
// }

// operator button functions

// opInputAdd = () => inputFunction("/", "*", "-", "+", 1, 0);

// opInputSub = () => inputFunction("/", "*", "+", "-", 1, 0);

// opInputMult = () => inputFunction("+", "-", "/", "*", 0, 1);

// opInputDiv = () => inputFunction("+", "-", "*", "/", 0, 1);

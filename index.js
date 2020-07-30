const elemFun = (x) => document.getElementById(x).getAttribute("value");
const calcScreen = (x) => document.getElementById("screen").value+=x;
const clearScreen = () => document.getElementById("screen").value="";
const getScreen = () => parseInt(document.getElementById("screen").value);
const calcFunction = (x) => document.getElementById("screen").value=x; 

console.log(getScreen())

let answer = null;
let screenValue;
let lastUserInput;
let operator;
let floating = false;
let opSet = false;
let opFirstButton = false;

// clear all user input and put calc in blank state
clearAll = () => {
  document.getElementById("screen").value="";
  answer = null;
  screenValue = 0;
  lastUserInput = 0;
  operator = "";
  opSet = false;
  opFirstButton = false;
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
  if(opFirstButton === true) {
    clearScreen();
    opFirstButton = false
  }
}

// const checkFloat = (calcButton) => {
//   if(floating) {
//     calcScreen(`.${calcButton}`)
//     floating = false;
//   }
// }

// number functions

numberInput0 = () => { opClear(); calcScreen(calcButton0); }; 
numberInput1 = () => { opClear(); calcScreen(calcButton1); };
numberInput2 = () => { opClear(); calcScreen(calcButton2); };
numberInput3 = () => { opClear(); calcScreen(calcButton3); };
numberInput4 = () => { opClear(); calcScreen(calcButton4); };
numberInput5 = () => { opClear(); calcScreen(calcButton5); };
numberInput6 = () => { opClear(); calcScreen(calcButton6); };
numberInput7 = () => { opClear(); calcScreen(calcButton7); };
numberInput8 = () => { opClear(); calcScreen(calcButton8); };
numberInput9 = () => { opClear(); calcScreen(calcButton9); };
dotInput = () => { opClear(); calcScreen(dotButton); };


// operator functions

opFunction = () => {

  if(getScreen() === NaN) {
    calcScreen(answer);
  }

  if(opFirstButton === true) {
    screenValue = lastUserInput;
  } else if(opFirstButton === false && answer) {
    screenValue = parseFloat(answer);
    lastUserInput = getScreen();
  }

  switch(operator) {

    case "+":

      if(opFirstButton === true) {
        answer = getScreen() + lastUserInput;
      } else {
        answer = screenValue + getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(answer);

      break;
    
    case "/":

      if(opFirstButton === true) {
        answer = getScreen() / lastUserInput;
      } else {
        answer = screenValue / getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(answer);
      
      break;

    case "*":

      if(opFirstButton === true) {
        answer = getScreen() * lastUserInput;
      } else {
        answer = screenValue * getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(answer);
      
      break;

    case "-":

      if(opFirstButton === true) {
        answer = getScreen() - Math.abs(lastUserInput);
      } else {
        answer = screenValue - getScreen();
        lastUserInput = getScreen();
      }

      calcFunction(answer);

      break;

    }

  opFirstButton = true;

};

const inputFunction = (Op) => {
  
  if(opSet===true && opFirstButton===true ){
    operator = Op
  }
  else if(opSet===true && opFirstButton===false) {
    opFunction();
  } 
  else if(opSet === false) {
    screenValue = getScreen();
    lastUserInput = screenValue;
    opSet = true;
    opFirstButton = true;
    console.log(`This is opSet: ${opSet}.`)
    console.log(`This is opFirstButton: ${opFirstButton}.`)
  }

  operator = Op;
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

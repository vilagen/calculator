const elemFun = (x) => document.getElementById(x).getAttribute("value");
const calcScreen = (x) => document.getElementById("screen").value+=x;
const clearScreen = () => document.getElementById("screen").value="";
const getScreen = () => Number(document.getElementById("screen").value);
const calcFunction = (x) => document.getElementById("screen").value=x; 

console.log(getScreen())

let answer = null;
let screenValue;
let lastUserInput;
let operator;
let fixedValue = 0;
let fixedAmnt = 0;
let floating = false;
let floatNext = false;
let newValue = false;
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

// take off any zeros at end of value on screen.
const fixedAmntValue = (value) => {
  if(floating) {
    valueArray = value.toString().split("")
    let i = 0;
    let l = valueArray.length;
    for( i = l-1; i > 0; i--) {
      if(l[i] === "0") {
        fixedAmnt--
      }
      else if(l[i] != "0" ) {
        return Number(value.toFixed(fixedAmnt));
      }
    }
  }
  else {
    return value;
  }
}

// number functions

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

// function to create floating numbers
dotInput = () => { 
  opClear(); 
  if(floating === false) {
    floating = true;
    floatNext = true;
  }  
};


// operator functions

opFunction = () => {

  console.log(screenValue);
  console.log(lastUserInput)

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
    console.log(`This is opSet: ${opSet}.`)
    console.log(`This is opFirstButton: ${opFirstButton}.`)
  }

  operator = Op;
  floating = false;
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

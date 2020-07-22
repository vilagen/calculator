clearAll = () => {
  document.getElementById("screen").value="";
};

const elemFun = (x) => document.getElementById(x).getAttribute("value");
const calcScreen = (x) => document.getElementById("screen").value+=x;
const clearScreen = () => document.getElementById("screen").value="";
const getScreen = () => parseInt(document.getElementById("screen").value);
const calcFunction = (x) => document.getElementById("screen").value=x; 

console.log(getScreen())

let answer;
let screenValue;
let lastUserInput;
let operator;
let opSet = false;
let opFirstButton = false;

// calc buttons
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

// operator buttons
const calcDivision = elemFun("opValue/");
const calcAddition = elemFun("opValue+");
console.log(typeof calcButton0);

// clear if you already perfromed an operation
const opClear = () => {
  if(opFirstButton === true) {
    clearScreen();
    opFirstButton = false
  }
}

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

// operator functions

opFunction = () => {

  if(getScreen() === NaN) {
    calcScreen(answer);
  }

  console.log("This is last user input: " + lastUserInput);

  if(opFirstButton === true) {
    screenValue = lastUserInput;
  } else if(opFirstButton === false && answer) {
    screenValue = parseInt(answer);
    lastUserInput = getScreen();
  }

  // console.log("This is screenvalue: " + screenValue);

  // console.log("this is getscreen: " + getScreen())

  switch(operator) {

    case "+":
      answer = getScreen() + screenValue; 
      calcFunction(answer);
      break;
    
    case "/":

    console.log("Check opfirstButton: " + opFirstButton)

      if(opFirstButton === true) {
        // lastUserInput = 1;
        answer = getScreen() / lastUserInput;
      } else {
        answer = screenValue / getScreen();
        lastUserInput = getScreen();
      }

      console.log("This is screenvalue division after answer: " + screenValue);
      console.log("Thi is lastuserinput2: " + lastUserInput);
      calcFunction(answer);
      
      break;

    case "*":
      answer = getScreen() * screenValue;
      calcFunction(answer);
    break;

    case "-":

      if(opFirstButton === true) {
        answer = getScreen() - Math.abs(lastUserInput);
      } else {
        answer = screenValue - getScreen();
        lastUserInput = getScreen();
      }

      // console.log("This is screenvalue minus: " + screenValue);
      // console.log("Thi is lastuserinput2: " + lastUserInput);
      calcFunction(answer);

      break;

    }

  console.log("This is answer: " + answer)
  opFirstButton = true;

};

opInputAdd = () => {

  if(opSet===true && operator != "+" && (operator == "/" || operator == "*") ){
    lastUserInput = 1;
  }
  if(opSet===true && operator != "+") {
    lastUserInput = 0;
  };

  if(opSet === true) {
    opFunction();
  };

  if(opSet === false) {
    screenValue = getScreen();
    lastUserInput = screenValue;
    opSet = true;
    opFirstButton = true;
  };

  operator = "+";

};

opInputDiv = () => {

  if(opSet===true && ( operator === "+" || operator === "-" ) ) {
    lastUserInput = 1;
  }

  console.log("This is screenvalue division: " + screenValue);
  console.log("Thi is lastuserinput division: " + lastUserInput);

  if(opSet === true) {
    opFunction();
  };

  if(opSet === false) {
    screenValue = getScreen();
    lastUserInput = screenValue;
    opSet = true;
    opFirstButton = true;
  };

  operator = "/";

};

opInputMult = () => {

  if(opSet===true && operator != "/") {
    lastUserInput;
  }

  if(opSet === true) {
    opFunction();
  };

  if(opSet === false) {
    screenValue = getScreen();
    lastUserInput = screenValue;
    opSet = true;
    opFirstButton = true;
  }

  operator = "*";

};

opInputSub = () => {

  if(opSet===true && operator != "-") {
    lastUserInput = 0;
  }

  if (opSet === true) {
    opFunction();
  } else if(opSet === false) {
    screenValue = getScreen();
    lastUserInput = screenValue;
    opSet = true;
    opFirstButton = true;
    console.log("For minus, this is screen value: " + screenValue);
  }

  operator = "-";

};
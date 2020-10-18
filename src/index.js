const currenttxt = document.querySelector(".current");
const anstxt = document.querySelector(".ans");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const del = document.querySelector(".del");
const clear = document.querySelector(".clear");
const point = document.querySelector(".point");
const sign = document.querySelector(".sign");

let current = null;
let ans = null;
let memory = null;
let operator = null;

function setAns() {
  if (operator === null) {
    ans = current;
  }
}

function setToZero() {
  if (current === null) {
    current = 0;
  }
}

function show() {
  if (current !== null) {
    currenttxt.innerText = current;
  } else {
    currenttxt.innerText = "0";
  }
}

function calculate() {
  if (current !== null) {
    if (memory !== null) {
      if (operator === "+") {
        ans = memory + current;
      } else if (operator === "-") {
        ans = memory - current;
      } else if (operator === "*") {
        ans = memory * current;
      } else if (operator === "/") {
        ans = memory / current;
      } else if (operator === "^") {
        ans = Math.pow(memory, current);
      }
      ans = parseFloat(ans.toFixed(15)); //prevent float calculation bug
      anstxt.innerText = ans;
    } else if (operator === "-") {
      current = -current;
      ans = current;
      operator = null;
      show();
    }
  }
  //console.log(`${memory}${operator}${current}=${ans}`);
}

function init() {
  numbers.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      setToZero();
      const n = event.target.innerText;
      const c = currenttxt.innerText;
      let newtxt = current.toString();
      if (c.indexOf(".") >= 0) {
        if (c.slice(-1) === ".") {
          newtxt = newtxt.concat("", ".");
        } else if (c.slice(-1) === "0") {
          newtxt = c;
        }
      }
      if (
        n === "0" &&
        ((c.indexOf(".") >= 0 && memory === null) || c === "-")
      ) {
        console.log("hello");
        newtxt = c.concat("", "0");
        currenttxt.innerText = newtxt;
      } else {
        newtxt = newtxt.concat("", n);
        current = parseFloat(newtxt);
        setAns();
        calculate();
        show();
      }
    });
  });
  operators.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      operator = event.target.innerText;
      if (current === null) {
        if (operator === "-" && memory === null) {
          currenttxt.innerText = "-";
        }
      } else {
        current = ans;
        memory = current;
        show();
        current = null;
      }
    });
  });
  equal.addEventListener("click", function (event) {
    calculate();
    current = ans;
    memory = null;
    operator = null;
    anstxt.innerText = "";
    show();
  });
  point.addEventListener("click", function (event) {
    setToZero();
    let newtxt = current.toString();
    let c = currenttxt.innerText;
    if (c.indexOf(".") < 0) {
      if (newtxt === "0" && c[0] === "-") {
        newtxt = c;
      }
      currenttxt.innerText = newtxt.concat("", ".");
    }
  });
  sign.addEventListener("click", function (event) {
    if (current !== null) {
      current = -current;
      setAns();
      calculate();
      show();
    }
  });
  del.addEventListener("click", function (event) {
    setToZero();
    let newtxt = currenttxt.innerText.slice(0, -1);
    if (newtxt === "" || isNaN(newtxt)) {
      newtxt = "0";
    }
    current = parseFloat(newtxt);
    setAns();
    calculate();
    show();
  });
  clear.addEventListener("click", function (event) {
    current = null;
    ans = null;
    memory = null;
    operator = null;
    anstxt.innerText = "";
    show();
  });
}

init();

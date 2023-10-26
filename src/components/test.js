import React, { useReducer } from "react";

const initialState = {
  display: "0",
  currentInput: "0",
  operator: null,
  previousInput: null,
  waitingForNewInput: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "digit":
      if (state.currentInput.length >= 9) {
        return state;
      }
      return {
        ...state,
        currentInput: state.waitingForNewInput
          ? action.payload
          : state.currentInput === "0"
          ? action.payload
          : state.currentInput + action.payload,
        waitingForNewInput: false,
      };

    case "operator":
      if (state.operator && state.previousInput !== null) {
        return calculateResult(state);
      }
      return {
        ...state,
        operator: action.payload,
        waitingForNewInput: true,
      };

    case "equals":
      return calculateResult(state);

    case "clear":
      return initialState;

    default:
      return state;
  }
}

function calculateResult(state) {
  const num1 = parseFloat(state.previousInput);
  const num2 = parseFloat(state.currentInput);

  if (state.operator === "+") {
    return {
      ...state,
      currentInput: (num1 + num2).toString(),
      operator: null,
      previousInput: null,
    };
  } else if (state.operator === "-") {
    return {
      ...state,
      currentInput: (num1 - num2).toString(),
      operator: null,
      previousInput: null,
    };
  } else if (state.operator === "*") {
    return {
      ...state,
      currentInput: (num1 * num2).toString(),
      operator: null,
      previousInput: null,
    };
  } else if (state.operator === "/") {
    if (num2 === 0) {
      return {
        ...state,
        currentInput: "Error",
        operator: null,
        previousInput: null,
      };
    } else {
      return {
        ...state,
        currentInput: (num1 / num2).toString(),
        operator: null,
        previousInput: null,
      };
    }
  }
}

function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="calculator">
      <div className="display">{state.currentInput}</div>
      <div className="buttons">
        <div className="row">
          <button onClick={() => dispatch({ type: "clear" })}>C</button>
          <button onClick={() => dispatch({ type: "digit", payload: "7" })}>
            7
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "8" })}>
            8
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "9" })}>
            9
          </button>
          <button onClick={() => dispatch({ type: "operator", payload: "/" })}>
            /
          </button>
        </div>
        <div className="row">
          <button onClick={() => dispatch({ type: "digit", payload: "4" })}>
            4
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "5" })}>
            5
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "6" })}>
            6
          </button>
          <button onClick={() => dispatch({ type: "operator", payload: "*" })}>
            *
          </button>
        </div>
        <div className="row">
          <button onClick={() => dispatch({ type: "digit", payload: "1" })}>
            1
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "2" })}>
            2
          </button>
          <button onClick={() => dispatch({ type: "digit", payload: "3" })}>
            3
          </button>
          <button onClick={() => dispatch({ type: "operator", payload: "-" })}>
            -
          </button>
        </div>
        <div className="row">
          <button onClick={() => dispatch({ type: "digit", payload: "0" })}>
            0
          </button>
          <button onClick={() => dispatch({ type: "equals" })}>=</button>
          <button onClick={() => dispatch({ type: "operator", payload: "+" })}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;

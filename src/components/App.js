import { createContext, useReducer, useContext, useState } from "react";
import "../App.css";
import { evaluate } from "mathjs";

const RangeContext = createContext();
function App() {
  const [range, setRange] = useState("1");
  // console.log(range);
  console.log(evaluate("2+2"));

  const initialState = {
    dispaly: "",
    err: "",
  };

  function CalcReducer(state, action) {
    switch (action.type) {
      case "digit":
        return {
          ...state,
          dispaly: state.dispaly.concat(action.payLoad),
          err: "",
        };
      case "del":
        return {
          ...state,
          dispaly: state.dispaly.slice(0, -1),
          err: "",
        };
      case "clear":
        return initialState;
      case "operator":
        const optr = `${action.payLoad}`;
        return {
          ...state,
          dispaly: state.dispaly.concat(optr),
          err: "",
        };
      case "equals":
        let finale = "";
        try {
          const answer = evaluate(`${state.dispaly.toString()}`);
          finale = answer;
        } catch {
          finale = "ERROR";
        }
        if (finale === "ERROR") {
          return {
            ...state,
            dispaly: "",
            err: finale,
          };
        } else {
          const TrAns = finale.toString();
          let theFin = "";
          const expRegex = /^[+-]?\d*\.?\d+([eE][+-]?\d+)?$/;
          if (expRegex.test(TrAns)) {
            theFin = parseFloat(TrAns).toExponential(5);
          } else if (TrAns.length > 11) {
            theFin = parseFloat(TrAns).toFixed(11);
          } else {
            theFin = TrAns;
          }
          return {
            ...state,
            dispaly: theFin.toString(),
            err: "",
          };
        }
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(CalcReducer, initialState);
  console.log(state.dispaly);

  return (
    <RangeContext.Provider value={{ range, setRange, state, dispatch }}>
      <div
        className={`bg-mbg h-screen theme${range} flex justify-center pt-10 lg:pt-0 lg:items-center`}
      >
        <Calc />
      </div>
    </RangeContext.Provider>
  );
}

function Calc() {
  const { range } = useContext(RangeContext);
  return (
    <div className="w-[90vw] lg:w-[576px] pt-5">
      <div className="flex justify-between items-center">
        <h4
          className={`font-bold text-3xl ${
            range === "1" ? "text-white" : "text-text"
          }`}
        >
          calc
        </h4>
        <ThemeChanger />
      </div>
      <CalcScreen />
      <div
        className={`grid h-[55dvh] min-h-[400px] sm:h-auto grid-cols-4 grid-rows-4 w-full rounded-md gap-3.5 sm:gap-6 mt-6 p-[25px] sm:p-[30px] bg-tbg theme${range}`}
      >
        <Keypad name="7" />
        <Keypad name="8" />
        <Keypad name="9" />
        <Keypad name="DEL" tcolor="text-white" bcolor="bg-kbg" cas="del" />
        <Keypad name="4" />
        <Keypad name="5" />
        <Keypad name="6" />
        <Keypad name="+" cas="operator" />
        <Keypad name="1" />
        <Keypad name="2" />
        <Keypad name="3" />
        <Keypad name="-" cas="operator" />
        <Keypad name="." cas="operator" />
        <Keypad name="0" />
        <Keypad name="/" cas="operator" />
        <Keypad name="x" cas="operator" load="*" />
        <Keypad
          name="RESET"
          cas="clear"
          tcolor="text-white"
          bcolor="bg-kbg"
          classnm="col-span-2"
        />
        <Keypad
          name="="
          cas="equals"
          tcolor="text-teq"
          bcolor="bg-roc"
          classnm="col-span-2"
        />
      </div>
    </div>
  );
}

function ThemeChanger() {
  const { range, setRange } = useContext(RangeContext);

  function handleChange(e) {
    setRange(e.target.value);
  }

  return (
    <section className="flex items-end gap-7">
      <label
        htmlFor="slider"
        className={`font-medium text-[12px] theme${range} pb-2 ${
          range === "1" ? "text-white" : "text-text"
        }`}
      >
        THEME
      </label>
      <div className="w-[60px]">
        <div className="flex justify-between px-1 pb-[2px]">
          <p
            className={`font-medium text-xs ${
              range === "1" ? "text-white" : "text-text"
            } theme${range}`}
          >
            1
          </p>
          <p
            className={`font-medium text-xs theme${range} ${
              range === "1" ? "text-white" : "text-text"
            }`}
          >
            2
          </p>
          <p
            className={`font-medium text-xs ${
              range === "1" ? "text-white" : "text-text"
            } theme${range}`}
          >
            3
          </p>
        </div>
        <div>
          <input
            type="range"
            id="slider"
            name="slider"
            min="1"
            max="3"
            step="1"
            value={range}
            onChange={handleChange}
            className={`w-full themeRange bg-tbg theme${range} rangeThumb${range}`}
          />
        </div>
      </div>
    </section>
  );
}

function CalcScreen() {
  const { range, state } = useContext(RangeContext);

  const preval = state.dispaly;
  const errr = state.err;
  const val =
    state.err.length !== 0 ? errr : state.dispaly.length === 0 ? "0" : preval;
  return (
    <div>
      <input
        className={` px-6 font-lespar text-right text-[40px] w-full focus:outline-none mt-8 h-[88px] rounded-md indis  bg-sbg theme${range} font-bold ${
          range === "1" ? "text-white" : "text-text"
        }`}
        name="screen"
        id="screen"
        value={val}
        type="text"
        readOnly
      />
    </div>
  );
}

function Keypad({
  name = "9",
  bcolor = "bg-oyv",
  tcolor = "text-text",
  classnm = " ",
  cas = "digit",
  load = name,
}) {
  const shad =
    name === "="
      ? "shadow-eqs text-[20px]"
      : (name === "DEL") | (name === "RESET")
      ? "shadow-del text-[20px]"
      : "text-[35px] shadow-txt";
  const { range, dispatch } = useContext(RangeContext);

  return (
    <div className={`${classnm}`}>
      <button
        value={name}
        onClick={() => dispatch({ type: `${cas}`, payLoad: `${load}` })}
        className={`pt-[15px] h-full pb-[12px] font-bold border-none w-full text-lg rounded-md hover:scale-105  ${shad} theme${range} ${bcolor} ${tcolor}`}
      >
        {name}
      </button>
    </div>
  );
}

export default App;

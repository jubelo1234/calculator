import { createContext, useContext, useState } from "react";
import "../App.css";

const RangeContext = createContext();
function App() {
  const [range, setRange] = useState("1");
  console.log(range);

  return (
    <RangeContext.Provider value={{ range, setRange }}>
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
        className={`grid grid-cols-4 grid-rows-4 w-full rounded-md gap-3.5 sm:gap-6 mt-6 p-[25px] sm:p-[30px] bg-tbg theme${range}`}
      >
        <Keypad name="7" />
        <Keypad name="8" />
        <Keypad name="9" />
        <Keypad name="DEL" tcolor="text-white" bcolor="bg-kbg" />
        <Keypad name="4" />
        <Keypad name="5" />
        <Keypad name="6" />
        <Keypad name="+" />
        <Keypad name="1" />
        <Keypad name="2" />
        <Keypad name="3" />
        <Keypad name="-" />
        <Keypad name="." />
        <Keypad name="0" />
        <Keypad name="/" />
        <Keypad name="x" />
        <Keypad
          name="RESET"
          tcolor="text-white"
          bcolor="bg-kbg"
          classnm="col-span-2"
        />
        <Keypad
          name="="
          tcolor="text-teq"
          bcolor="bg-roc"
          classnm="col-span-2"
        />
      </div>
      /
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
  const { range } = useContext(RangeContext);
  return (
    <div>
      <input
        className={`px-6 font-lespar text-right text-[40px] w-full focus:outline-none mt-8 h-[88px] rounded-md bg-sbg theme${range} font-bold ${
          range === "1" ? "text-white" : "text-text"
        }`}
        name="screen"
        id="screen"
        value="399,981"
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
}) {
  const shad =
    name === "="
      ? "shadow-eqs text-[20px]"
      : (name === "DEL") | (name === "RESET")
      ? "shadow-del text-[20px]"
      : "shadow-txt text-[30px] sm:text-[35px]";
  const { range } = useContext(RangeContext);

  return (
    <div className={`${classnm}`}>
      <button
        className={`pt-[15px] pb-[12px] font-bold border-none w-full text-lg rounded-md hover:scale-105  ${shad} theme${range} ${bcolor} ${tcolor}`}
      >
        {name}
      </button>
    </div>
  );
}

export default App;

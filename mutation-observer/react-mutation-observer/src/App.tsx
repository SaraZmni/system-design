import { useRef, useState } from "react";
import "./App.css";

function App() {
  const elementRef = useRef(null);
  const [bool, setBool] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div>
      <div>
        <button onClick={() => setBool((prev) => !prev)}>Toggle</button>
      </div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <div ref={elementRef}>{value}</div>
    </div>
  );
}

export default App;

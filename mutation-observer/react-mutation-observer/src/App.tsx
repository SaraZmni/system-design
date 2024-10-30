import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useLatest } from "./useLatest";

const options = { attributes: true };

function useMutationObserver(cb, options) {
  const [element, setElement] = useState(null);
  const lastestCb = useLatest(cb);

  useEffect(() => {
    const element = ref.current;

    if (element) return;

    const observer = new MutationObserver((...args) => {
      lastestCb.current(args);
    });
    observer.observe(element, options);

    return () => observer.disconnect();
  }, [element, lastestCb, options]);

  return setElement;
}

function App() {
  const elementRef = useRef(null);
  const [bool, setBool] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(elementRef.current);
  }, [elementRef]);

  const mutationRef = useMutationObserver(() => console.log("change"), options);

  const combinedRef = useCombinedRef(mutationRef, elementRef);

  return (
    <div>
      <div>
        <button onClick={() => setBool((prev) => !prev)}>Toggle</button>
      </div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      {bool && <div ref={mutationRef}>{value}</div>}
    </div>
  );
}

export default App;

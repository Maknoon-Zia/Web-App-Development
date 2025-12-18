import { useState } from "react";
import "./Counter.css"; // Import CSS file

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    setCount(count - 1);
  }

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h1>Counter</h1>
        <p className="count">{count}</p>
        <div className="btn-group">
          <button className="btn increase" onClick={increase}>
            +1
          </button>
          <button className="btn decrease" onClick={decrease}>
            -1
          </button>
          <button className="btn reset" onClick={() => setCount(0)}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;

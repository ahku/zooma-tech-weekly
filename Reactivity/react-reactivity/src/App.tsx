import { useState } from "react";
import "../../vue-reactivity/src/assets/base.css";
import "../../vue-reactivity/src/assets/main.css";
import { Counter } from "./Counter";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Counter value={count} />
      <div className="text-center">
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

export default App;

import { useEffect, useMemo } from "react";

export function Counter({ value }: { value: number }) {
  console.log("React component rendered");

  const varDouble = value * 2;
  const fnDouble = () => value * 2;
  const memoedDouble = useMemo(() => value * 2, [value]);

  let effectDouble = value * 2;
  useEffect(() => {
    effectDouble = value * 2;
  }, [value]);

  return (
    <div className="greetings">
      <h1 className="green">React prop reactivity</h1>
      <h3>
        Value (<code>prop</code>): <strong>{value}</strong>
      </h3>
      <h3>
        Double (<code>const</code>): <strong>{varDouble}</strong>
      </h3>
      <h3>
        Double (<code>function</code>): <strong>{fnDouble()}</strong>
      </h3>
      <h3>
        Double (<code>useMemo</code>): <strong>{memoedDouble}</strong>
      </h3>
      <h3>
        Double (<code>usehEffect</code>): <strong>{effectDouble}</strong>
      </h3>
    </div>
  );
}

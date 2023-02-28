export function HelloWorld({ msg }) {
  console.log("Solid component rendered");

  const varMsg = msg.toUpperCase();
  const functionMsg = () => msg.toUpperCase();

  return (
    <div className="greetings">
      <h1 className="green">Solid prop reactivity</h1>
      <h3>
        Prop: <strong>{msg}</strong>
      </h3>
      <h3>
        Variable: <strong>{varMsg}</strong>
      </h3>
      <h3>
        Function: <strong>{functionMsg()}</strong>
      </h3>
    </div>
  );
}

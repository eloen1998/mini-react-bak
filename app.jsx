import React from "./core/React.js";

function Foo() {
  const [counter, setCounter] = React.useState(10);

  const [bar, setBar] = React.useState("bar");
  function handleClick() {
    setCounter((c) => c + 1);
    setBar((b) => b + "a");
  }

  React.useEffect(() => {
    console.log("init");
  }, []);
  React.useEffect(() => {
    console.log("counter effect", counter);
  }, [counter]);
  React.useEffect(() => {
    console.log("bar effect", bar);

    return () => {
      console.log("cleanup");
    };
  }, [bar]);

  return (
    <div>
      <h1>foo</h1>
      {counter}
      <div>{bar}</div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

let countRoot = 1;
function App() {
  console.log("app rerun");

  function handleClick() {
    countRoot++;
  }

  return (
    <div>
      hi-mini-react count: {countRoot}
      <button onClick={handleClick}>click</button>
      <Foo></Foo>
    </div>
  );
}

export default App;

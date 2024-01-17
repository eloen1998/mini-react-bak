import React from "./core/React.js";

let counter = 12;
function Counter({ num }) {
  function handleClick() {
    counter++;
    React.update();
  }

  return (
    <div>
      counter: {counter}
      <button onclick={handleClick}>add</button>
    </div>
  );
}

// const app = React.createElement("div", { id: "app" }, React.createTextNode("hello "), "mini-react");

const app = (
  <div id="app">
    <Counter num="10"></Counter>
  </div>
);
export default app;

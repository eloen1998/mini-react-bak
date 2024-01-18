import React from "./core/React.js";

let showBar = false;
function Counter({ num }) {
  const foo = (
    <div>
      foo
      <div>foo p</div>
    </div>
  );
  const bar = <div>bar</div>;
  function handleClick() {
    showBar = !showBar;
    React.update();
  }

  return (
    <div>
      Counter
      <div>{showBar ? bar : foo}</div>
      <button onclick={handleClick}>add</button>
    </div>
  );
}

// const app = React.createElement("div", { id: "app" }, React.createTextNode("hello "), "mini-react");

const app = (
  <div id="app">
    hi-mini-react
    <Counter num="10"></Counter>
  </div>
);
export default app;

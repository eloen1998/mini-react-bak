import React from "./core/React.js";

function Counter({ num }) {
  return <div>counter: {num}</div>;
}

// const app = React.createElement("div", { id: "app" }, React.createTextNode("hello "), "mini-react");

const app = (
  <div id="app">
        hello mini-react
        <Counter num="10"></Counter>
        <div>22</div>
        <Counter num="12"></Counter>
  </div>
);

export default app;

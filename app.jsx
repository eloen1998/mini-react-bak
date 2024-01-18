import React from "./core/React.js";

let counterFoo = 10;
function Foo() {
  function handleAdd() {
    counterFoo++;
    React.update();
  }

  return (
    <div style="margin-top: 30px">
      foo = {counterFoo}
      <button onclick={handleAdd}>add1</button>
    </div>
  );
}
let counterBar = 100;
function Bar() {
  function handleAdd() {
    counterBar++;
    React.update();
  }

  return (
    <div style="margin-top: 30px">
      bar = {counterBar}
      <button onclick={handleAdd}>add2</button>
    </div>
  );
}

const app = (
  <div id="app">
    hi-mini-react
    <Foo></Foo>
    <Bar></Bar>
  </div>
);
export default app;

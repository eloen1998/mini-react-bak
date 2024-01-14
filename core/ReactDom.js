import React from "./React.js";

const ReactDOM = {
  createRoot(rootDom) {
    return {
      render(el) {
        React.render(el, rootDom);
      }
    };
  }
};

export default ReactDOM;

function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) => {
      if (typeof child === "string") {
        return createTextNode(child);
      } else {
        return child;
      }
    })
  };
}
function createTextNode(text) {
  return {
    type: "TEXT-ELEMENT",
    nodeValue: text
  };
}

export default {
  createTextNode,
  createElement
};

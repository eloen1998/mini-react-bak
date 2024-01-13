function render(el, parent) {
  let dom;
  if (el.type === "TEXT-ELEMENT") {
    dom = document.createTextNode(el.nodeValue);
  } else {
    dom = document.createElement(el.type);

    Object.assign(dom, el.props);
    if (el.children) {
      el.children.forEach((child) => {
        render(child, dom);
      });
    }
  }

  parent.append(dom);
}

const ReactDOM = {
  createRoot(rootDom) {
    return {
      render(el) {
        render(el, rootDom);
      }
    };
  }
};

export default ReactDOM;

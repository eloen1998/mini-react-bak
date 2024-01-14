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

function runTask(task) {
  const { el, parent, sibling } = task;

  let nextTask = null;

  let dom;
  if (el.type === "TEXT-ELEMENT") {
    dom = document.createTextNode(el.nodeValue);
  } else {
    dom = document.createElement(el.type);

    Object.assign(dom, el.props);
  }

  parent.append(dom);

  if (el.children) {
    nextTask = {
      parent: dom,
      sibling: el.children[1],
      el: el.children[0]
    };
    return nextTask;
  }

  if (sibling) {
    return sibling;
  }

  if (parent) {
    return parent?.sibling;
  }
}


let nextTask = null;
function runTaskQueue(deadline) {
  while (deadline.timeRemaining() > 1 && nextTask) {
    nextTask = runTask(nextTask);
  }

  requestIdleCallback(runTaskQueue);
}

requestIdleCallback(runTaskQueue);

const ReactDOM = {
  createRoot(rootDom) {
    return {
      render(el) {
        nextTask = { el, parent: rootDom };
        requestIdleCallback(runTaskQueue);
      }
    };
  }
};

export default ReactDOM;

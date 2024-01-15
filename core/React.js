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
    props: {
      nodeValue: text
    }
  };
}

function createDom(type) {
  return type === "TEXT-ELEMENT" ? document.createTextNode("") : document.createElement(type);
}

function updateProps(dom, props) {
  // Object.keys(props).forEach((key) => {
  //   dom[key] = props[key];
  // });
  Object.assign(dom, props);
}

function runTask(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber.type);

    updateProps(fiber.dom, fiber.props);

    // fiber.parent.dom.append(fiber.dom);
  }

  if (fiber.children) {
    let prevChild = null;
    fiber.children.forEach((child) => {
      const newFiber = {
        type: child.type,
        props: child.props,
        children: child.children,
        child: null,
        parent: fiber,
        sibling: null,
        dom: null
      };
      if (prevChild) {
        prevChild.sibling = newFiber;
      } else {
        fiber.child = newFiber;
        prevChild = child;
      }
    });
  }

  if (fiber.child) {
    return fiber.child;
  }

  if (fiber.sibling) {
    return fiber.sibling;
  }

  let fiberParent = fiber.parent;

  while (fiberParent) {
    if (fiberParent.sibling) {
      return fiberParent.sibling;
    }
    fiberParent = fiberParent.parent;
  }
}

function render(el, container) {
  let nextTask = {
    dom: container,
    children: [el],
    root: true
  };

  let rootTask = nextTask;

  let render = false;

  function runTaskQueue(deadline) {
    while (deadline.timeRemaining() > 1 && nextTask) {
      nextTask = runTask(nextTask);
    }

    if (!nextTask && !render) {
      commitCommon(rootTask);
      render = true;
    }

    requestIdleCallback(runTaskQueue);
  }

  requestIdleCallback(runTaskQueue);
}

function commitCommon(fiber, root) {
  if (!fiber) return;
  if (!fiber.root) {
    let fiberParent = fiber.parent;

    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent;
    }
    console.log("fiberParent", fiberParent);

    fiberParent.dom.append(fiber.dom);
  }

  commitCommon(fiber.child);
  commitCommon(fiber.sibling);
}

export default {
  render,
  createTextNode,
  createElement
};

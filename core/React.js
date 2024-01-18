function createElement(type, props, ...children) {
  return {
    type,
    props,
    children: children.map((child) => {
      if (["string", "number"].includes(typeof child)) {
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

function updateProps(dom, props, oldProps) {
  if (!props) {
    return;
  }

  Object.keys(oldProps).forEach((key) => {
    if (!(key in props)) {
      dom.removeAttribute(key);
    }
  });
  Object.keys(props).forEach((key) => {
    if (key.startsWith("on")) {
      const event = key.slice(2).toLowerCase();

      dom.removeEventListener(event, oldProps[key]);
      dom.addEventListener(event, props[key]);
    } else {
      dom[key] = props[key];
    }
  });
}

const shouldDeleteDom = [];

function initChildren(fiber) {
  const children = typeof fiber.type === "function" ? [fiber.type(fiber.props)] : fiber.children;

  let oldFiber = fiber.alternate?.child;

  if (children) {
    let prevChild = null;
    children.forEach((child) => {
      if (!child) {
        console.log('aaaa')
      }
      let newFiber;
      if (oldFiber) {
        const isSameType = oldFiber.type === child.type;
        if (isSameType) {
          newFiber = {
            type: child.type,
            props: child.props,
            children: child.children,
            child: null,
            parent: oldFiber?.parent,
            sibling: null,
            dom: oldFiber.dom,
            alternate: oldFiber,
            commitTag: "update"
          };
        } else {
          shouldDeleteDom.push(oldFiber.dom);
        }
        oldFiber = oldFiber.sibling;
      } else {
        newFiber = {
          type: child.type,
          props: child.props,
          children: child.children,
          child: null,
          parent: fiber,
          sibling: null,
          dom: null,
          alternate: oldFiber,
          commitTag: "placement"
        };
      }

      if (prevChild) {
        prevChild.sibling = newFiber;
      } else {
        fiber.child = newFiber;
      }
      if (newFiber) {
        prevChild = newFiber;
      }
    });

    while (oldFiber) {
      if (oldFiber.dom) {
        shouldDeleteDom.push(oldFiber.dom);
      }
      oldFiber = oldFiber.sibling;
    }
  }
}

function runTask(fiber) {
  if (typeof fiber.type !== "function") {
    if (!fiber.dom) {
      fiber.dom = createDom(fiber.type);
    }
    updateProps(fiber.dom, fiber.props, {});
  }

  initChildren(fiber);

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

let nextTask;
let preTask;
let root;
function render(el, container) {
  nextTask = {
    dom: container,
    children: [el],
    root: true
  };
  root = nextTask;
}

function runTaskQueue(deadline) {
  while (deadline.timeRemaining() > 1 && nextTask) {
    nextTask = runTask(nextTask);
  }

  if (!nextTask && root) {
    commitCommon(root);
    console.log("root", root);
    preTask = root;
    root = null;
  }

  requestIdleCallback(runTaskQueue);
}

requestIdleCallback(runTaskQueue);

function commitCommon(fiber) {
  if (!fiber) return;
  if (!fiber.root) {
    let fiberParent = fiber.parent;

    while (!fiberParent.dom) {
      fiberParent = fiberParent.parent;
    }

    if (fiber.dom) {
      if (fiber.commitTag === "placement") {
        fiberParent.dom.append(fiber.dom);
      } else {
        updateProps(fiber.dom, fiber.props, fiber.alternate.props);
      }
    }
  } else {
    shouldDeleteDom.forEach((dom) => {
      dom.remove();
    });
  }

  commitCommon(fiber.child);
  commitCommon(fiber.sibling);
}

function update() {
  nextTask = {
    dom: preTask.dom,
    children: preTask.children,
    alternate: preTask,
    root: true
  };
  root = nextTask;
}

export default {
  update,
  render,
  createTextNode,
  createElement
};

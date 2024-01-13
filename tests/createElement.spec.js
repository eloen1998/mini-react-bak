import { describe, it, expect } from "vitest";
import React from "../core/React";

describe("createElement", () => {
  it("should create element", () => {
    const el = React.createElement("div", {}, "Hello mini-react!");
    expect(el).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "nodeValue": "Hello mini-react!",
            "type": "TEXT-ELEMENT",
          },
        ],
        "props": {},
        "type": "div",
      }
    `);
  });

  it("should create element", () => {
    const el = React.createElement("div", {id: "app"}, "Hello ", React.createTextNode("mini-react!"));
    expect(el).toMatchInlineSnapshot(`
      {
        "children": [
          {
            "nodeValue": "Hello ",
            "type": "TEXT-ELEMENT",
          },
          {
            "nodeValue": "mini-react!",
            "type": "TEXT-ELEMENT",
          },
        ],
        "props": {
          "id": "app",
        },
        "type": "div",
      }
    `);
  });
});

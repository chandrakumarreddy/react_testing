import React from "react";
import { shallow, mount } from "enzyme";

import App from "../App";

describe("App", () => {
  let app = shallow(<App />);
  test("renders App header", () => {
    expect(app.find("h1").text()).toBe("NoteToSelf");
  });
  test("renders clear button", () => {
    expect(app.find(".clear").text()).toBe("clear notes");
  });
  describe("Form", () => {
    test("renders form", () => {
      expect(app.find("Form").exists()).toBe(true);
    });
    test("renders submit button", () => {
      expect(app.find("[type='submit']").length).toBe(1);
    });
    describe("user enters text", () => {
      beforeEach(() => {
        app.find("#todo").simulate("change", { target: { value: "todo app" } });
        app.find("Form").simulate("submit", { preventDefault: jest.fn() });
      });
      afterEach(() => {
        app.find(".clear").simulate("click");
      });
      test("validate state when form is submitted", () => {
        expect(app.state().notes[0].text).toBe("todo app");
      });
      describe("clear state", () => {
        test("verify if notes is empty", () => {
          app.find(".clear").simulate("click");
          expect(app.state().notes).toEqual([]);
        });
      });
      describe("re-render", () => {
        let app1;
        beforeEach(() => {
          app1 = mount(<App />);
        });
        test("check if notes are loaded from cookie", () => {
          expect(app1.state().notes[0].text).toBe("todo app");
        });
      });
    });
  });
});

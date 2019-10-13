import React from "react";
import { mount } from "enzyme";

import NotesItem from "../NotesItem";

const PROPS = { note: { text: "todo task", _id: 1 } };

describe("NOTE", () => {
  let note = mount(<NotesItem {...PROPS} />);
  test("renders note text", () => {
    expect(note.find(".noteText").text()).toBe(PROPS.note.text);
  });
});

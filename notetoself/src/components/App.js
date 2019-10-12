import React, { Component } from "react";
import shortid from "shortid";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import { bake_cookie, read_cookie } from "sfcookies";
import NotesItem from "./NotesItem";

const NOTES = "NOTES";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      notes: []
    };
  }
  componentDidMount() {
    this.setState({ notes: read_cookie(NOTES) });
  }

  updateNotes = notes =>
    this.setState(
      {
        notes
      },
      () => bake_cookie(NOTES, this.state.notes)
    );

  handleSubmit = e => {
    e.preventDefault();
    const { notes, text } = this.state;
    this.updateNotes([...notes, { text: text, _id: shortid.generate() }]);
    this.setState({ text: "" });
  };
  handleChange = e => this.setState({ text: e.target.value });

  displayNotes = () =>
    this.state.notes.map((note, index) => (
      <NotesItem
        note={note}
        key={index}
        removeNote={this.removeNote}
        updateText={this.updateText}
      />
    ));

  updateText = (id, val) => {
    const { notes } = this.state;
    const newId = notes.findIndex(note => note._id === id);
    const newNotes = [
      ...notes.slice(0, newId),
      { _id: id, text: val },
      ...notes.slice(newId + 1)
    ];
    this.updateNotes(newNotes);
  };
  removeNote = _id =>
    this.updateNotes(this.state.notes.filter(note => note._id !== _id));

  render() {
    const { text } = this.state;
    return (
      <Container>
        <h1>noteToSelf</h1>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={11}>
              <Form.Control onChange={this.handleChange} value={text} />
            </Col>
            <Col xs={1}>
              <Button type="submit" disabled={!text}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Sortable
          onChange={order => {
            const newNotes = order.map(note => JSON.parse(note));
            this.setState({ notes: newNotes }, () =>
              bake_cookie(NOTES, this.state.notes)
            );
          }}
          className="row"
        >
          {this.displayNotes()}
        </Sortable>
      </Container>
    );
  }
}

import React, { Component } from "react";
import shortid from "shortid";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Sortable from "react-sortablejs";
import orderBy from "lodash/orderBy";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import NotesItem from "./NotesItem";

const NOTES = "NOTES";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      notes: [],
      orderType: "asc"
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

  sortOrderType = () => {
    const { orderType, notes } = this.state;
    this.setState(
      {
        orderType: orderType === "asc" ? "desc" : "asc"
      },
      () => {
        this.setState({
          notes: orderBy(notes, "text", orderType)
        });
      }
    );
  };
  clearNotes = () => {
    this.setState({ notes: [] }, () => delete_cookie(NOTES, []));
  };

  render() {
    const { text, orderType, notes } = this.state;
    return (
      <Container>
        <h1>NoteToSelf</h1>
        <Form onSubmit={this.handleSubmit} className="row">
          <Col xs={9}>
            <Form.Control onChange={this.handleChange} value={text} id="todo" />
          </Col>
          <Col xs={3}>
            <Button
              type="submit"
              disabled={!text}
              className="btn btn-primary btn-block"
            >
              Submit
            </Button>
          </Col>
        </Form>
        <Row>
          <Col>
            <Button
              onClick={this.sortOrderType}
              className="mb-2 btn btn-primary btn-block"
              disabled={notes.length <= 1}
            >
              sort by {orderType}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={this.clearNotes}
              className="mb-2 btn btn-danger btn-block clear"
              disabled={notes.length === 0}
            >
              clear notes
            </Button>
          </Col>
        </Row>
        <Sortable
          onChange={order => {
            const newNotes = order.map(note => JSON.parse(note));
            this.setState({ notes: newNotes }, () => bake_cookie(NOTES, notes));
          }}
          className="row"
        >
          {this.displayNotes()}
        </Sortable>
      </Container>
    );
  }
}

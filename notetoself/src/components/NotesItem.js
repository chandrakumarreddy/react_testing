import React from "react";
import { Alert, Col, Form } from "react-bootstrap";

export default function NotesItem({ note, removeNote, updateText }) {
  const [text, setText] = React.useState(note.text);
  const [edit, setEdit] = React.useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setEdit(false);
    updateText(note._id, text);
  };
  return (
    <Col xs={12} data-id={JSON.stringify(note)}>
      <Alert className="text-left" variant="secondary" className="aliceBlue">
        <div className="d-flex justify-content-between">
          {edit && (
            <Form onSubmit={handleSubmit} inline className="mb-0">
              <Form.Control
                onChange={e => setText(e.target.value)}
                value={text}
              />
            </Form>
          )}
          {!edit && <div>{note.text}</div>}
          <div>
            <span className="b1 success" onClick={() => setEdit(true)}>
              Edit
            </span>
            <span className="b1 danger" onClick={() => removeNote(note._id)}>
              Delete
            </span>
          </div>
        </div>
      </Alert>
    </Col>
  );
}

import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setNote({ title: "", description: "", tag: "" });
    if (await addNote(note.title, note.description, note.tag)) {
      props.showAlert("Note Added Successfully", "success");
    } else {
      props.showAlert("Failed to add Note", "danger");
    }
  };

  return (
    <div className="my-3">
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Note Title"
            onChange={onChange}
            name="title"
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Description"
            onChange={onChange}
            name="description"
            value={note.description}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Note Tag"
            onChange={onChange}
            name="tag"
            value={note.tag}
          />
        </div>
        <button
          type="button"
          disabled={!(note.title.length && note.description.length)}
          className="btn btn-primary"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

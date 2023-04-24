import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

export default function Modal(props) {
  const note = props.modalData;
  const setNote = props.setModalData;
  const context = useContext(noteContext);
  const { editNote } = context;

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (await editNote(note._id, note.title, note.description, note.tag)) {
      props.showAlert("Note Edited Successfully", "success");
    } else {
      props.showAlert("Failed to Edit Note", "danger");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        id="modalbtn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        hidden
      >
        Launch modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                disabled={!(note.title.length && note.description.length)}
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Edit Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

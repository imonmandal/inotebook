import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext } from "react";

export default function NoteItem(props) {
  const { note, setModalData } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-pen-to-square mx-3"
              onClick={() => {
                setModalData({ ...note });
                let modalbtn = document.getElementById("modalbtn");
                modalbtn.click();
              }}
            ></i>
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

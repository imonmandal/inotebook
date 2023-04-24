import React from "react";
import noteContext from "../context/notes/noteContext";
import { useState, useContext, useEffect } from "react";
import NoteItem from "./NoteItem";
import Modal from "./Modal";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const { showAlert } = props;

  useEffect(() => {
    getNotes();
  }, []);

  const [modalData, setModalData] = useState({
    _id: "",
    uid: "",
    title: "",
    description: "",
    tag: "",
    date: "",
    __v: 0,
  });

  return (
    <>
      <Modal
        modalData={modalData}
        setModalData={setModalData}
        showAlert={showAlert}
      />

      <div>
        <h1>Your Notes</h1>
        {notes.notes.length === 0 && "No notes to display"}
        <div className="row g-3">
          {notes.notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                note={note}
                setModalData={setModalData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

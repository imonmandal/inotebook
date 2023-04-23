import React from "react";
import noteContext from "../context/notes/noteContext";
import { useContext, useEffect } from "react";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
  });

  return (
    <div>
      <h1>Your Notes</h1>
      <div className="row g-3">
        {notes.notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    </div>
  );
}

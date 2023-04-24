import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState({ notes: [] });

  const getNotes = async () => {
    let res = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZmFjOTY2N2YxZjFjM2EwNTU4YmU0In0sImlhdCI6MTY4MTg5NDU1MH0.zbt9peJVFJGf3dlzFeACMDqa9JEiw7-pYxZ9I1AgVG0",
      },
    });
    res = await res.json();
    setNotes(res);
  };

  const addNote = async (title, description, tag) => {
    let res = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZmFjOTY2N2YxZjFjM2EwNTU4YmU0In0sImlhdCI6MTY4MTg5NDU1MH0.zbt9peJVFJGf3dlzFeACMDqa9JEiw7-pYxZ9I1AgVG0",
      },
      body: JSON.stringify(
        tag.length ? { title, description, tag } : { title, description }
      ),
    });
    if (res.status === 200) {
      getNotes();
      return true;
    }
    return false;
  };

  const deleteNote = async (id) => {
    let res = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZmFjOTY2N2YxZjFjM2EwNTU4YmU0In0sImlhdCI6MTY4MTg5NDU1MH0.zbt9peJVFJGf3dlzFeACMDqa9JEiw7-pYxZ9I1AgVG0",
      },
    });
    if (res.status === 200) {
      const newNotes = notes.notes.filter((note) => {
        return note._id !== id;
      });
      setNotes({ notes: newNotes });
    }
  };

  const editNote = async (id, title, description, tag) => {
    if (tag.length === 0) tag = "General";
    let res = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzZmFjOTY2N2YxZjFjM2EwNTU4YmU0In0sImlhdCI6MTY4MTg5NDU1MH0.zbt9peJVFJGf3dlzFeACMDqa9JEiw7-pYxZ9I1AgVG0",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (res.status === 200) {
      let newNotes = notes.notes;
      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i] = { ...newNotes[i], title, description, tag };
          break;
        }
      }
      setNotes({ notes: newNotes });
      return true;
    }
    return false;
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

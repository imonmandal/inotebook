import React, { useEffect } from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  const { showAlert } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, []);

  return (
    localStorage.getItem("authToken") && (
      <>
        <AddNote showAlert={showAlert} />
        <Notes showAlert={showAlert} />
      </>
    )
  );
}

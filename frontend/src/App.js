import React, { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const addNote = () => {
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newNote) => {
        setNotes([...notes, newNote]);
        setText("");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={addNote}>Add</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

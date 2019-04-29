import React, { memo, useState } from "react";
import { TwitterPicker } from "react-color";
import { FaMapPin, FaPalette } from "react-icons/fa";
import Post from "./Post";

// import fs from "fs";

const DEFAULT_COLOR = "yellow";
const PALETTE_COLOR = [
  "#4fc3f7",
  "#FFFF00",
  "#fda1ff",
  "#ff5722",
  "#2aff00",
  "#d9e3f0",
  "#dce775",
  "#ff8a65",
  "#ba68c8"
];

const Board = memo(() => {
  const [notes, setNote] = useState([]);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [isPalette, togglePalette] = useState(false);

  function newPost(content) {
    setNote(prevState => [
      ...prevState,
      {
        id: nextId(),
        content,
        color,
        posX: randomPos(0, window.innerWidth - 180),
        posY: randomPos(0, window.innerHeight - 180),
        angle: randomPos(-25, 25)
      }
    ]);
  }

  function randomPos(a, b) {
    return a + Math.ceil(Math.random() * (b - a));
  }

  function nextId() {
    return notes.length
      ? Math.max.apply(Math, notes.map(note => note.id)) + 1
      : 1;
  }

  function colorChange(color) {
    setColor(color.hex);
    togglePalette(!isPalette);
  }

  function save(content, id) {
    setNote(prevState =>
      prevState.map(note =>
        note.id !== id
          ? note
          : {
              ...note,
              content
            }
      )
    );
  }

  function remove(id) {
    setNote([...notes.filter(note => note.id !== id)]);
  }

  return (
    <div className="main-board">
      {notes.map(note => (
        <Post
          key={note.id}
          id={note.id}
          onSave={save}
          onRemove={remove}
          x={note.posX}
          y={note.posY}
          color={note.color}
          angle={note.angle}
        >
          {note.content}
        </Post>
      ))}
      <div className="nav">
        {isPalette && (
          <div className="palette-pop">
            <TwitterPicker
              onChange={colorChange}
              triangle="top-right"
              colors={PALETTE_COLOR}
            />
          </div>
        )}
        <button
          className="palette-btn"
          style={{ color: color || DEFAULT_COLOR }}
          onClick={() => togglePalette(!isPalette)}
        >
          <FaPalette />
        </button>
        <button className="add-btn" onClick={() => newPost("내용...")}>
          <FaMapPin />
        </button>
      </div>
    </div>
  );
});

export default Board;

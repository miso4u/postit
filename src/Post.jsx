import React, { useEffect, useRef, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

const Post = ({ id, children, onRemove, x, y, angle, color, onSave }) => {
  const editBox = useRef();
  const [isSelect, setSelect] = useState(false);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (isEdit) {
      editBox.current.focus();
      editBox.current.select();
    }
  }, [isEdit]);

  function save() {
    onSave(editBox.current.value, id);
    setEdit(false);
  }

  return (
    <div
      className="post"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: `rotate(${angle}deg)`,
        zIndex: isSelect ? 99999 : "inherit",
        backgroundColor: color
      }}
      // draggable={true}
      onClick={() => setSelect(true)}
      onDoubleClick={() => setEdit(true)}
    >
      {isEdit ? (
        <>
          <textarea defaultValue={children} rows={5} ref={editBox} />
          <span className="nav-bottom">
            <button onClick={save}>
              <FaSave />
            </button>
          </span>
        </>
      ) : (
        <>
          <div className="content">{children}</div>
          <span className="nav-top">
            <button className="close" onClick={() => onRemove(id)}>
              <FaTimes />
            </button>
          </span>
        </>
      )}
    </div>
  );
};

export default Post;

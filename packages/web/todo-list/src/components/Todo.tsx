import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { TodoItem } from "../models/todoModel";
import cx from "classnames";

interface Props {
  todo: TodoItem;
  editing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onSave: (v: string) => void;
  onCancel: () => void;
  onDestroy: () => void;
}

const KeyCodes = {
  Enter: "Enter",
  Escape: "Escape",
};

export function Todo(props: Props) {
  const [editText, setEditText] = useState(props.todo.title);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEditText(event.target.value);
  }

  function handleEdit() {
    props.onEdit();
    setEditText(props.todo.title);
  }

  function handleSubmit() {
    const val = editText.trim();

    if (!val) {
      return props.onDestroy();
    }

    props.onSave(val);
    setEditText(val);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === KeyCodes.Enter) {
      handleSubmit();
    } else if (event.code === KeyCodes.Escape) {
      props.onCancel();
      setEditText(props.todo.title);
    }
  }

  return (
    <li
      className={cx({
        editing: props.editing,
        completed: props.todo.completed,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={props.onToggle}
        />
        <label onDoubleClick={handleEdit}>{props.todo.title}</label>
        <button className="destroy" onClick={props.onDestroy}></button>
      </div>
      <input
        className="edit"
        value={editText}
        onChange={handleChange}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
}
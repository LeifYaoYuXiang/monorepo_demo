import React, { ChangeEvent, KeyboardEvent } from "react";

interface Props {
  newTodo: string;
  handleNewTodoKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  handleNewTodoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Header(props: Props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={props.newTodo}
        onKeyDown={props.handleNewTodoKeyDown}
        onChange={props.handleNewTodoChange}
        autoFocus={true}
      />
    </header>
  );
}
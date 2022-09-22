import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { TodoItem, TodoModel } from "./models/todoModel";

const KeyCodes = {
  Enter: "Enter",
  Escape: "Escape",
};

function App({ model }: Props) {
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState("");

  function handleNewTodoKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code !== KeyCodes.Enter) {
      return;
    }

    event.preventDefault();

    const val = newTodo.trim();

    if (!val) {

    }
    model.addTodo(val);
    console.log(val)
    fetch('http://localhost:9090/post_data', {
      mode: 'no-cors',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: "param1="+val
    })
    console.log(val)
    setNewTodo("");
  }

  function handleNewTodoChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTodo(event.target.value);
  }

  function onToggle(todo: TodoItem) {
    model.toggle(todo);
  }

  function onToggleAll(checked: boolean) {
    model.toggleAll(checked);
  }

  function onDestroy(todo: TodoItem) {
    model.destroy(todo);
  }

  function onEdit(todo: TodoItem) {
    setEditing(todo.id);
  }

  function onSave(todo: TodoItem, val: string) {
    model.save(todo, val);
    setEditing("");
  }

  function onCancel() {
    setEditing("");
  }

  return (
    <section className="todoapp">
      <Header
        newTodo={newTodo}
        handleNewTodoChange={handleNewTodoChange}
        handleNewTodoKeyDown={handleNewTodoKeyDown}
      />
      <Main
        editing={editing}
        todos={model.todos}
        onToggle={onToggle}
        onToggleAll={onToggleAll}
        onDestroy={onDestroy}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
      />
      <Footer />
    </section>
  );
}

interface Props {
  model: TodoModel;
}

export default App;
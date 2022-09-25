import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";
import { TodoItem, TodoModel } from "./models/todoModel";
import axios from 'axios';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    // body: JSON.parse(data) 
    body: JSON.stringify(data) 
  });
  return response;
}

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
    console.log(val);
    // postData('http://localhost:9080/post_data', {'content': val}) 
    // .then((data) => {
    //   console.log(data); // JSON data parsed by `data.json()` call
    // });
    // console.log(JSON.stringify({'content': val}))
    var details = {
      'content': val
    }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let post_content = formBody.join("&");
    console.log(post_content)

    let res = fetch('http://localhost:9080/post_data', {
      mode: 'no-cors',
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
      }),
      body: post_content
    }).then(function (response: any) {
        console.log(response);
    }).catch(function (error: any) {
        console.log(error);
    });
    // console.log(res)
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
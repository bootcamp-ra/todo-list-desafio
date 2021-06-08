import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Todo from "./Todo";
import axios from "axios";

export default function TodoList() {
  var [newTaskText, setNewTaskText] = useState("");
  var [tasks, setTasks] = useState([]);

  useEffect(() => {
    const request = axios.get("http://localhost:4000/tasks");
    request.then(setNewTasksFromResponse);
  }, []);

  function addTask() {
    const request = axios.post("http://localhost:4000/tasks", { description: newTaskText, isChecked: false });
    request.then((res) => {
      setNewTasksFromResponse(res);
      setNewTaskText("");
    })
  }

  function removeTask(taskIndex) {
    const request = axios.delete("http://localhost:4000/tasks", { data: { index: taskIndex } });
    request.then(setNewTasksFromResponse);
  }

  function toggleTaskCheck(taskIndex) {
    const task = tasks[taskIndex];

    const request = axios.put("http://localhost:4000/tasks", {
      index: taskIndex,
      task: {
        description: task.description,
        isChecked: !task.isChecked,
      },
    });
  
    request.then(setNewTasksFromResponse);
  }

  function setNewTasksFromResponse(res) {
    const newTasks = res.data.map((t) => ({
      description: t.description,
      isChecked: t.isChecked,
    }));

    setTasks(newTasks);
  }

  return (
    <Container>
      <ListTitle>TO-DO LIST</ListTitle>
      <div>
        <NewTask>
          <input
            onChange={(event) => setNewTaskText(event.target.value)}
            value={newTaskText}
            placeholder="Add New To-do"
          ></input>
          <button onClick={addTask}>Add</button>
        </NewTask>
        <div>
          {tasks.map((task, i) => (
            <Todo
              key={i}
              index={i}
              isChecked={task.isChecked}
              onRemove={removeTask}
              onTaskClick={toggleTaskCheck}
            >
              <p>{task.description}</p>
            </Todo>
          ))}
        </div>
      </div>
    </Container>
  );
}

const ListTitle = styled.div`
  background: #0052d4;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 700;
  color: white;
  height: 40px;
  align-items: center;
`;

const NewTask = styled.div`
  display: flex;

  input {
    width: 75%;
    height: 50px;
    border: none;
    padding: 5px;
    box-sizing: border-box;
    font-size: 16px;
  }

  button {
    width: 25%;
    height: auto;
    border: none;
    color: #2980b9;
    cursor: pointer;
    background: rgb(205, 223, 255);
  }
`;

const Container = styled.div`
  width: 30%;
  background: white;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
`;

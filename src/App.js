import React, { Children } from "react";

import { useState } from "react";
import "./style.css";

function ListItem(props) {
  const { children, modifyList, i, onDelete } = props;
  const [isEditMode, setEditMode] = useState(false);
  const [tempTask, updateTask] = useState(children);

  return isEditMode ? (
    <li>
      <textarea className="editTask" value={tempTask} onChange={(e) => {
        updateTask(e.target.value)
      }}></textarea>
      <button className="saveTask" onClick={() => {
        modifyList(tempTask, i);
      }}>Save</button>
    </li>
  ) : (
    <>
      <li className="list">{children}</li>
      <button onClick={() => {
        setEditMode(true);
      }}>Edit</button>
      <button className="deletebtn" onClick={onDelete}>Delete</button>
    </>
  );
}
function App() {
  const [task, taskUpdate] = useState("");
  const [todo, todoUpdate] = useState([]);

  function modifyList(modifyTask, index) {
    // const newList =[];
    // for(let i=0; i<todo.length;i++){
    // 	if(i=== index){
    // 		newList.push(todo[i]);
    // 	}
    // 	else{
    // 		newList.push(todo[i]);
    // 	}
    // }
    // todoUpdate(newList);
    const newList = todo.map((tasks, i) => {
      if (i === index) {
        return modifyTask;
      } else {
        return tasks;
      }

    });
    todoUpdate(newList);
  }
  function onDelete(index) {
    const newList = todo.filter((task, i) => {
      return i !== index;
    });
    todoUpdate(newList);
  }
  return (
    <div id="main">
      <div className="contianer">
        <h1 style={{ textAlign: "center" }}>My To Do List</h1>
        <textarea className="text" onChange={(e) => {
          taskUpdate(e.target.value);
        }} value={task}>
        </textarea>
        <button id="btn" onClick={() => {
          console.log(task);
          if (task !== "") {
            todoUpdate([...todo, task]);
            taskUpdate("");
          }

        }}>
          Add task</button>
      </div>
      <ul style={{ marginLeft: 300 }}>
        {todo.map((tasks, i) => {
          return <>
            <ListItem key={tasks} modifyList={modifyList} i={i}
              onDelete={() => {
                onDelete(i)
              }}>{tasks}</ListItem>
          </>
        })}
      </ul>

    </div>
  );
}


export default App;


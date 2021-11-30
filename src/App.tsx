import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type tasksType = Array<taskType>
export type valueType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<tasksType>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [value, setValue] = useState<valueType>("all")

    const filteredTasks = (id:string) => setTasks(tasks.filter(f => f.id !== id));

    let tasksForTl = tasks;
        if (value === "active") {
            tasksForTl = tasks.filter(f => !f.isDone)
        } else if (value === "completed") {
            tasksForTl = tasks.filter(f => f.isDone)
        }

const addTask = (title: string) => {
  let newTask = {id: v1(), title: title.trim(), isDone: false};
  setTasks([newTask, ...tasks]);
}

        const checkTask = (id: string, isDone: boolean) => {
          setTasks(tasks.map(m => m.id === id? {...m, isDone: isDone}: m))
        }


    return (
        <div className="App">
            <Todolist tasks = {tasksForTl}
                      filteredTasks = {filteredTasks}
                      setValue = {setValue}
                      addTask = {addTask}
                      checkTask = {checkTask}
                      value = {value}
            />
        </div>
    );
}

export default App;



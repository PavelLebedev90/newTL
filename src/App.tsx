import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TodolistsType = Array<TodoListType>
type taskType = {
    id: string
    title: string
    isDone: boolean
}
type tasksType = {
    [key: string]: Array<taskType>
}

function App() {
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    let [todolist, setTodolist] = useState<TodolistsType>([
        {id: todoListID_1, title: 'what to learn', filter: 'all'},
        {id: todoListID_2, title: 'what to buy', filter: 'all'}
    ]);

    let [tasks, setTasks] = useState<tasksType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Sugar', isDone: true},
            {id: v1(), title: 'Сoffee', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    });


    function removeTask(id: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== id)});
    }

    function addTask(title: string, todolistID: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone} : m)});
    }
    function changeTaskTitle(taskId: string, title: string, todolistID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, title} : m)});
    }

    function changeTitle(title: string, todolistID: string) {
        setTodolist(todolist.map(m => m.id === todolistID ? {...m, title} : m))
    }

    function changeFilter(value: FilterValuesType, todolistID: string) {
        setTodolist(todolist.map(m => m.id === todolistID ? {...m, filter: value} : m))
    }

    function deleteTodolist(id: string) {
        setTodolist(todolist.filter(f => f.id !== id))
        delete tasks[id];
        setTasks({...tasks})
    }

    const addTodolist = (title:string) => {
        const newTodo: TodoListType = {
            id:v1(),
            title: title,
            filter: "all"
        }
        setTodolist([...todolist, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }

    const paintTodolists = todolist.map(m => {
        let tasksForTodolist = tasks[m.id];

        if (m.filter === 'active') {
            tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
        }
        if (m.filter === 'completed') {
            tasksForTodolist = tasks[m.id].filter(t => t.isDone);
        }
        return (
            <Todolist key={m.id}
                      id={m.id}
                      title={m.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={m.filter}
                      deleteTodolist={deleteTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTitle={changeTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}

            />
            {paintTodolists}
        </div>
    );
}

export default App;

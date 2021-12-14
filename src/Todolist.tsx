import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string,todolistID:string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    id:string
    filter:FilterValuesType
    deleteTodolist: (id: string)=> void
    changeTaskTitle: (taskId: string, title: string, todolistID: string)=> void
    changeTitle: (title: string, todolistID: string)=> void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string)=> {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
const changeTLTitleHandler = (title: string) => {
  props.changeTitle(title, props.id)
}

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTaskTitleHandler={changeTLTitleHandler}/>
            <button onClick={()=>props.deleteTodolist(props.id)}>XXX</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const changeTaskTitleHandler = (title: string) => {
                      props.changeTaskTitle(t.id, title, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      changeTaskTitleHandler={changeTaskTitleHandler}
                        />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}

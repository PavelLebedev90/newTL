import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {tasksType, valueType} from "./App";
import {Button} from "./Button";
import classes from "./Todolist.module.css"


type TLtasksType = {
    tasks: tasksType
    filteredTasks: (id:string)=> void
    setValue: (value: valueType)=> void
    addTask: (title: string) => void
    checkTask: (id: string, isDone: boolean) => void
    value: valueType
}



export function Todolist({value,...props}: TLtasksType) {


    const[title, setTitle] = useState("");
    const[error, setError] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("")
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && title.trim() !== ""){
            props.addTask(title);
            setTitle("")
        }else{
            setError("not valid value")
        }
    }
    const onClickHandler = () => {
        if(title.trim() === ""){
            return  setError("not valid value")
        }
        props.addTask(title);
        setTitle("")
    }
    const onFocusHandler = () =>{
        setError("")
    }

    const tsarFunk = (value: valueType) =>{
        props.setValue(value);
    }
const onChangeTaskHandler = (id: string, event: ChangeEvent<HTMLInputElement>) => {
        props.checkTask(id, event.currentTarget.checked)
}

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input className={error? classes.errorInput: ""} value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} onFocus={onFocusHandler}/>
                <Button error = {error} callBack={onClickHandler} name={"+"}/>
                <div className={error? classes.error: ''}>{error}</div>
            </div>
            <ul>
                {props.tasks.map(m =><li key={m.id} className={m.isDone? classes.opasity: ""}><Button callBack = {()=>props.filteredTasks(m.id)} name={"x"}/>
                    <input type="checkbox" checked={m.isDone} onChange={(event) => onChangeTaskHandler(m.id, event)}/> <span>{m.title}</span></li>)}
            </ul>
            <div>
                <Button value = {value} callBack={()=>tsarFunk("all")} name={"all"}/>
                <Button value = {value} callBack={()=>tsarFunk("active")} name={"active"}/>
                <Button value = {value} callBack={()=>tsarFunk("completed")} name={"completed"}/>
            </div>
        </div>
    )
}


import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {tasksType, valueType} from "./App";
import {Button} from "./Button";


type TLtasksType = {
    tasks: tasksType
    filteredTasks: (id:string)=> void
    setValue: (value: valueType)=> void
    addTask: (title: string) => void
}



export function Todolist(props: TLtasksType) {
    const tasksMap = props.tasks.map(m =><li key={m.id}><Button callBack = {()=>props.filteredTasks(m.id)} name={"x"}/>
        <input type="checkbox" checked={m.isDone}/> <span>{m.title}</span></li>)

    const[title, setTitle] = useState("");
    const[error, setError] = useState("");

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            props.addTask(title);
            setTitle("")
        }
    }
    const onClickHandler = () => {
        if(title.length === 0){
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

    return (
        <div>
            <h3>What to learn</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} onFocus={onFocusHandler}/>{error}
                <Button callBack={onClickHandler} name={"+"}/>
            </div>
            <ul>
                {tasksMap}
            </ul>
            <div>
                <Button callBack={()=>tsarFunk("all")} name={"all"}/>
                <Button callBack={()=>tsarFunk("active")} name={"active"}/>
                <Button callBack={()=>tsarFunk("completed")} name={"completed"}/>
            </div>
        </div>
    )
}


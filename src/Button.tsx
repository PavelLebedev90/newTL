import React from "react";
import {valueType} from "./App";
import classes from "./Todolist.module.css";

type ButtonType = {
    callBack: () => void
    name: string
    error?: string
    value?: valueType
}

 export function Button(props:ButtonType) {
    return (
        <button className={props.name === props.value? classes.button: ""} disabled={Boolean(props.error)} onClick={()=> props.callBack()}>{props.name}</button>
    )
}
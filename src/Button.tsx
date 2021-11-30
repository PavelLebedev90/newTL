import React from "react";

type ButtonType = {
    callBack: () => void
    name: string
}

 export function Button(props:ButtonType) {
    return (
        <button onClick={()=> props.callBack()}>{props.name}</button>
    )
}
import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItem from './components/AddItem';
import {addTodolist_AC,} from './reducers/Todolists_Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';

export type TasksType = {
    [key: string]: Array<{ id: string, title: string, isDone: boolean }>
}
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {

    let dispatch = useDispatch();
    let todolists = useSelector<rootReducerType, Array<TodolistType>>(state =>state.todolists)

    const addTodolist = useCallback((title: string)=> {
        dispatch(addTodolist_AC(title))
    },[dispatch])

    return (

        <div className="App">
            <AddItem addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    return (
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;

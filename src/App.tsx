import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItem from './components/AddItem';
import {createTodolistTC, getTodolistsTC, TodosType} from './reducers/Todolists_Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';


function App() {

    let dispatch = useDispatch();
    let todolists = useSelector<rootReducerType, Array<TodosType>>(state =>state.todolists)

    const addTodolist = useCallback((title: string)=> {
        // dispatch(addTodolist_AC(title))
        dispatch(createTodolistTC(title))
    },[dispatch])

    useEffect(()=>{
        dispatch(getTodolistsTC())
    },[])

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

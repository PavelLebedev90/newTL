import React, {ChangeEvent} from 'react';
import {TasksType, TodolistType} from './App';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';
import {changeFilterTL_AC, changeTitleTL_AC, deleteTL_AC} from './reducers/Todolists_Reducer';
import {addTask_AC, changeChecked_AC, changeTitleTask_AC, deleteTask_AC} from './reducers/Tasks_Reducer';



type PropsType = {
    todolistId: string
}


export const Todolist = React.memo((props: PropsType) => {
    let tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
    let todolist = useSelector<rootReducerType, TodolistType>(state => state.todolists.filter(f=>f.id === props.todolistId)[0])
    let dispatch = useDispatch();


    const onAllClickHandler = () =>   dispatch(changeFilterTL_AC(props.todolistId, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterTL_AC(props.todolistId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterTL_AC(props.todolistId, 'completed'));
    const addItem = (title: string) => {
        dispatch(addTask_AC(props.todolistId, title))
    }
    const editTL = (title: string) => {
        dispatch(changeTitleTL_AC(props.todolistId, title))
    }
    let tasksForTodolist = tasks[props.todolistId];

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    return <div>
        <h3><EditItem title={todolist.title} editStateItem={editTL}/>
            <button onClick={() =>  dispatch(deleteTL_AC(props.todolistId))}>deleteTL</button>
        </h3>
        <AddItem addItem={addItem}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () =>  dispatch(deleteTask_AC(props.todolistId, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeChecked_AC(props.todolistId, t.id, e.currentTarget.checked))
                    }
                    const editTask = (title: string) => {
                        dispatch(changeTitleTask_AC(props.todolistId, t.id, title))
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditItem title={t.title} editStateItem={editTask}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={todolist.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={todolist.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={todolist.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})



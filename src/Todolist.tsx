import React, {ChangeEvent, useEffect} from 'react';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';
import {changeFilterTL_AC, deleteTodolistTC, TodosType, updateTodolistTC} from './reducers/Todolists_Reducer';
import {addTaskTC, deleteTaskTC, getTasksTC, TasksType, updateTaskTC,} from './reducers/Tasks_Reducer';
import {TaskStatuses} from './api/TaskAPI';


type PropsType = {
    todolistId: string
}


export const Todolist = React.memo((props: PropsType) => {
    let tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
    let todolist = useSelector<rootReducerType, TodosType>(state => state.todolists.filter(f => f.id === props.todolistId)[0])
    let dispatch = useDispatch();


    const onAllClickHandler = () => dispatch(changeFilterTL_AC(props.todolistId, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterTL_AC(props.todolistId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterTL_AC(props.todolistId, 'completed'));
    const addItem = (title: string) => {
        dispatch(addTaskTC(props.todolistId, title))
    }
    const editTL = (title: string) => {
        dispatch(updateTodolistTC(props.todolistId, title))
    }
    let tasksForTodolist = tasks[props.todolistId];

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const deleteTodo = () => {
        dispatch(deleteTodolistTC(props.todolistId))
    }
    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [])

    return <div>
        <h3><EditItem title={todolist.title} editStateItem={editTL}/>
            <button onClick={deleteTodo}>deleteTL</button>
        </h3>
        <AddItem addItem={addItem}/>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(deleteTaskTC(props.todolistId, t.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const status = e.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New
                        dispatch(updateTaskTC(props.todolistId, t.id, {status}))
                    }
                    const editTask = (title: string) => {
                        dispatch(updateTaskTC(props.todolistId, t.id, {title}))
                    }
                    return <li key={t.id} className={t.status === TaskStatuses.Completed ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.status > 0}/>
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



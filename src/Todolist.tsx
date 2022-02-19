import React, {useEffect} from 'react';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';
import {changeFilterTL_AC, deleteTodolistTC, TodosType, updateTodolistTC} from './reducers/Todolists_Reducer';
import {addTaskTC, getTasksTC, TasksType,} from './reducers/Tasks_Reducer';
import {TaskStatuses} from './api/TaskAPI';
import {Delete} from '@mui/icons-material';
import {Button, CircularProgress, IconButton} from '@mui/material';
import {RequestStatusType} from './reducers/App-reducer';
import Tasks from './Tasks';


type PropsType = {
    todolistId: string
}


export const Todolist = React.memo(({todolistId}: PropsType) => {
    let tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)
    let todolist = useSelector<rootReducerType, TodosType>(state => state.todolists.filter(f => f.id === todolistId)[0])
    let dispatch = useDispatch();
    let todolistEntityStatus = useSelector<rootReducerType, RequestStatusType>(state => state.todolists
        .filter(f => f.id === todolistId)[0].entityStatus)

    const onAllClickHandler = () => dispatch(changeFilterTL_AC(todolistId, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterTL_AC(todolistId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterTL_AC(todolistId, 'completed'));
    const addItem = (title: string) => {
        dispatch(addTaskTC(todolistId, title))
    }
    const editTL = (title: string) => {
        dispatch(updateTodolistTC(todolistId, title))
    }
    let tasksForTodolist = tasks[todolistId];

    if (todolist.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const deleteTodo = () => {
        dispatch(deleteTodolistTC(todolistId))
    }
    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [])



    return <div>
        <h3><EditItem title={todolist.title} editStateItem={editTL} entityStatus={todolistEntityStatus}/>
            <IconButton onClick={deleteTodo} disabled={todolistEntityStatus === 'loading'}>
                {
                    todolistEntityStatus === 'loading'
                        ?
                        <CircularProgress disableShrink size={17}/>
                        :
                        <Delete/>
                }
            </IconButton>
        </h3>
        <AddItem addItem={addItem} disabled={todolistEntityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => (
                    <Tasks key={t.id}
                           task={t}
                    />
                ))
            }
        </div>
        <div>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
            >
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
            >
                Completed
            </Button>
        </div>
    </div>
})



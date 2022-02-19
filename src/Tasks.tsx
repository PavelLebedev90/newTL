import React, {ChangeEvent} from 'react';
import {deleteTaskTC, updateTaskTC} from './reducers/Tasks_Reducer';
import {TaskDomainType, TaskStatuses} from './api/TaskAPI';
import {Checkbox, CircularProgress, IconButton} from '@mui/material';
import EditItem from './components/EditItem';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {RequestStatusType} from './reducers/App-reducer';

type PropsType = {
    task: TaskDomainType & {
        entityStatus: RequestStatusType
    }
}


const Tasks = ({task}: PropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(deleteTaskTC(task.todoListId, task.id))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(task.todoListId, task.id, {status}))
    }
    const editTask = (title: string) => {
        dispatch(updateTaskTC(task.todoListId, task.id, {title}))
    }
    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox color={'primary'}
                  onChange={onChangeHandler}
                  checked={task.status > 0}/>
        <EditItem title={task.title} editStateItem={editTask} entityStatus={task.entityStatus}/>
        <IconButton onClick={onClickHandler} disabled={task.entityStatus === 'loading'}>
            {
                task.entityStatus === 'loading'
                ?
                <CircularProgress disableShrink size={17}/>
                :
                <Delete/>
            }
        </IconButton>
    </div>
};

export default Tasks;

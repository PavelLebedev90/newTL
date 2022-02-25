import {
    addTodolist_AC,
    changeTodolistEntityStatusAC,
    deleteTL_AC,
    getTodolists_AC, resetData_AC,
    TLActionType
} from './Todolists_Reducer';
import {Dispatch} from 'redux';
import {ModalType, taskAPI, TaskDomainType, UpdateModalType} from '../api/TaskAPI';
import {rootReducerType} from '../store/store';
import {RequestStatusType, setAppErrorAC} from './App-reducer';
import {AxiosError} from 'axios';
import {handleServerNetworkError, handleServerTaskResponse, handleServerTodolistResponse} from '../utils/error-utils';

export enum TaskActionType {
    DELETETASK = 'DELETETASK',
    ADD_TASK = 'ADD_TASK',
    GET_TASKS = 'GET_TASKS',
    UPDATE_TASK = 'UPDATE_TASK',
    CHANGE_TASK_ENTITY_STATUS = 'CHANGE_TASK_ENTITY_STATUS'
}

export type ChangeTaskEntityStatusType = ReturnType<typeof changeTaskEntityStatusAC>
type ActionTasksType =
    ReturnType<typeof deleteTL_AC>
    | ReturnType<typeof addTodolist_AC>
    | ReturnType<typeof deleteTask_AC>
    | ReturnType<typeof addTask_AC>
    | ReturnType<typeof getTodolists_AC>
    | ReturnType<typeof getTasks_AC>
    | ReturnType<typeof updateTask_AC>
    | ChangeTaskEntityStatusType
    | ReturnType<typeof resetData_AC>

export type TasksType = {
    [key: string]: Array<TaskDomainType & {
        entityStatus: RequestStatusType
    }>
}

let initialTasks: TasksType = {
    // [todolistId1]: [
    //     {id: v1(), title: 'HTML', isDone: true},
    //     {id: v1(), title: 'CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: false},
    //     {id: v1(), title: 'TS', isDone: false},
    //     {id: v1(), title: 'Java', isDone: false}
    // ],
    // [todolistId2]: [
    //     {id: v1(), title: 'Beer', isDone: true},
    //     {id: v1(), title: 'Fish', isDone: true},
    //     {id: v1(), title: 'Chips', isDone: false},
    //     {id: v1(), title: 'Some milk', isDone: false},
    //     {id: v1(), title: 'Vine', isDone: false}
    // ]
};

export const reducerTasks = (state: TasksType = initialTasks, action: ActionTasksType): TasksType => {
    switch (action.type) {
        case TLActionType.GET_TL: {
            let copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case TaskActionType.GET_TASKS:
            return {...state, [action.todolistId]: action.tasks.map(m => ({...m, entityStatus: 'idle'}))}

        case TLActionType.DELETE_TL:
            let newTasks = {...state};
            delete newTasks[action.id]
            return newTasks
        case TLActionType.ADD_TL:
            return {...state, [action.todo.id]: []}
        case TaskActionType.DELETETASK:
            return {...state, [action.id]: state[action.id].filter(f => f.id !== action.taskID)}
        case TaskActionType.ADD_TASK:
            return {
                ...state,
                [action.task.todoListId]: [{...action.task, entityStatus: 'idle'}, ...state[action.task.todoListId]]
            }
        case TaskActionType.UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskId ? {...m, ...action.model} : m)
            }
        case TaskActionType.CHANGE_TASK_ENTITY_STATUS:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(m => m.id === action.taskId ? {...m, entityStatus: action.entityStatus} : m)
            }
        case TLActionType.RESET_DATA:
            return {}
        default:
            return state
    }
}
// action creator

export const deleteTask_AC = (todolistId: string, taskId: string) => {
    return {
        type: TaskActionType.DELETETASK,
        id: todolistId,
        taskID: taskId
    } as const
}
export const addTask_AC = (task: TaskDomainType) => {
    return {
        type: TaskActionType.ADD_TASK,
        task
    } as const
}

export const updateTask_AC = (todolistId: string, taskId: string, model: ModalType) => {
    return {
        type: TaskActionType.UPDATE_TASK,
        model,
        todolistId,
        taskId
    } as const
}

export const getTasks_AC = (tasks: Array<TaskDomainType>, todolistId: string) => {
    return {
        type: TaskActionType.GET_TASKS,
        tasks,
        todolistId
    } as const
}
export const changeTaskEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType, taskId: string) => {
    return {
        type: TaskActionType.CHANGE_TASK_ENTITY_STATUS,
        entityStatus,
        todolistId,
        taskId
    } as const
}
// Thunk creator

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    handleServerTodolistResponse(todolistId, 'loading', dispatch)
    taskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(getTasks_AC(res.data.items, todolistId))
            handleServerTodolistResponse(todolistId, 'succeeded', dispatch)
        }).catch((error:AxiosError)=>{
        handleServerNetworkError(error, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
    })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    handleServerTodolistResponse(todolistId, 'loading', dispatch)
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTask_AC(res.data.data.item))
                handleServerTodolistResponse(todolistId, 'succeeded', dispatch)
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                handleServerTodolistResponse(todolistId, 'failed', dispatch)
            }

        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
        })


}
export const updateTaskTC = (todolistId: string, taskId: string, model: ModalType) =>
    (dispatch: Dispatch, getState: () => rootReducerType) => {
        const task = getState().tasks[todolistId].filter(f => f.id === taskId)[0]

        let apiModel: UpdateModalType = {
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            title: task.title,
            ...model
        }
        handleServerTaskResponse(todolistId, taskId, 'loading', dispatch)
        taskAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask_AC(todolistId, taskId, model))
                    handleServerTaskResponse(todolistId, taskId, 'succeeded', dispatch)
                }else{
                    dispatch(setAppErrorAC(res.data.messages[0]))
                    handleServerTaskResponse(todolistId, taskId, 'failed', dispatch)
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC(todolistId, 'failed', taskId))
            })
    }
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    handleServerTaskResponse(todolistId, taskId, 'loading', dispatch)
    taskAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTask_AC(todolistId, taskId))
            handleServerTaskResponse(todolistId, taskId, 'succeeded', dispatch)
        })
        .catch((error: AxiosError)=>{
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC(todolistId, 'failed', taskId))
        })
}

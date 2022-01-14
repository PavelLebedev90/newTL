import {addTodolist_AC, DELETE_TL, ADD_TL, deleteTL_AC, todolistId1, todolistId2} from './Todolists_Reducer';
import {v1} from 'uuid';
import {TasksType} from '../App';


const DELETETASK = 'DELETETASK'
const ADD_TASK = 'ADD_TASK'
const CHANGECHECKED = 'CHANGECHECKED'
const CHANGETITLETASK = 'CHANGETITLETASK'
const GET_LOCAL_Task = 'GET_LOCAL_Task'
type ActionTasksType =
    ReturnType<typeof deleteTL_AC>
    | ReturnType<typeof addTodolist_AC>
    | ReturnType<typeof deleteTask_AC>
    | ReturnType<typeof addTask_AC>
    | ReturnType<typeof changeChecked_AC>
    | ReturnType<typeof changeTitleTask_AC>
    | ReturnType<typeof localTask>

let initialTasks:TasksType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'TS', isDone: false},
        {id: v1(), title: 'Java', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Fish', isDone: true},
        {id: v1(), title: 'Chips', isDone: false},
        {id: v1(), title: 'Some milk', isDone: false},
        {id: v1(), title: 'Vine', isDone: false}
    ]
};

export const reducerTasks = (state:TasksType = initialTasks, action: ActionTasksType): TasksType => {
    switch (action.type) {
        case DELETE_TL:
            let newTasks = {...state};
            delete newTasks[action.id]
            return newTasks
        case ADD_TL:
            return {...state, [action.id]: []}
        case DELETETASK:
            return {...state, [action.id]: state[action.id].filter(f => f.id !== action.taskID)}
        case ADD_TASK:
            let newTask = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.id]: [newTask, ...state[action.id]]}
        case CHANGECHECKED:
            return {
                ...state,
                [action.id]: state[action.id].map(m => m.id === action.taskID ? {...m, isDone: action.isDone} : m)
            }
        case CHANGETITLETASK:
            return {...state,
                [action.payload.id]: state[action.payload.id].map(m => m.id === action.payload.taskID ? {
                    ...m,
                    title: action.payload.title
                } : m)
            }
        case GET_LOCAL_Task:
            return action.payload.newTask ? JSON.parse(action.payload.newTask) : state
        default:
            return state
    }
}
// export const deleteTLTask_AC = (todolistId: string) => {
//     return {
//         type: DELETE_TL_Task,
//         id: todolistId
//     } as const
// }
export const deleteTask_AC = (todolistId: string, taskId: string) => {
    return {
        type: DELETETASK,
        id: todolistId,
        taskID: taskId
    } as const
}
export const addTask_AC = (todolistId: string, title: string) => {
    return {
        type: ADD_TASK,
        id: todolistId,
        title
    } as const
}
export const changeChecked_AC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGECHECKED,
        id: todolistId,
        taskID: taskId,
        isDone
    } as const
}
export const changeTitleTask_AC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: CHANGETITLETASK,
        payload: {
            id: todolistId,
            taskID: taskId,
            title
        }

    } as const
}
export const localTask = (newTask: string | null)=>{
    return{
        type: "GET_LOCAL_Task",
        payload:{
            newTask
        }
    }as const
}
// export const addEmptyTask_AC = (id: string) => {
//     return {
//         type: ADDEMPTYTASK,
//         id
//     } as const
// }
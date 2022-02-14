import {addTodolist_AC, deleteTL_AC, getTodolists_AC, TLActionType} from './Todolists_Reducer';
import {Dispatch} from 'redux';
import {ModalType, taskAPI, TaskDomainType, UpdateModalType} from '../api/TaskAPI';
import {rootReducerType} from '../store/store';

export enum TaskActionType {
    DELETETASK = 'DELETETASK',
    ADD_TASK = 'ADD_TASK',
    GET_TASKS = 'GET_TASKS',
    UPDATE_TASK = 'UPDATE_TASK'
}


type ActionTasksType =
    ReturnType<typeof deleteTL_AC>
    | ReturnType<typeof addTodolist_AC>
    | ReturnType<typeof deleteTask_AC>
    | ReturnType<typeof addTask_AC>
    | ReturnType<typeof getTodolists_AC>
    | ReturnType<typeof getTasks_AC>
    | ReturnType<typeof updateTask_AC>


export type TasksType = {
    [key: string]: Array<TaskDomainType>
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
            return {...state, [action.todolistId]: action.tasks}

        case TLActionType.DELETE_TL:
            let newTasks = {...state};
            delete newTasks[action.id]
            return newTasks
        case TLActionType.ADD_TL:
            return {...state, [action.todo.id]: []}
        case TaskActionType.DELETETASK:
            return {...state, [action.id]: state[action.id].filter(f => f.id !== action.taskID)}
        case TaskActionType.ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case TaskActionType.UPDATE_TASK:
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(m => m.id === action.taskId ? {...m, ...action.model} : m)
            }
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

export const updateTask_AC = (todolistId:string, taskId:string, model: ModalType) => {
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
// Thunk creator

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) =>
{
    taskAPI.getTasks(todolistId)
        .then(res => {
            dispatch(getTasks_AC(res.data.items, todolistId))
        })
}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) =>
{
    taskAPI.createTask(todolistId, title)
        .then((res) => {
            dispatch(addTask_AC(res.data.data.item))
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
    taskAPI.updateTask(todolistId, taskId, apiModel)
        .then(() => {
            dispatch(updateTask_AC(todolistId, taskId, model))
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) =>
{
    taskAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(deleteTask_AC(todolistId, taskId))
        })
}

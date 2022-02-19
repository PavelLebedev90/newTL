import {Dispatch} from 'redux';
import {todolistAPI, TodolistAPIType} from '../api/TodolistAPI';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from './App-reducer';
import {AxiosError} from 'axios';
import {getFilter, handleServerNetworkError, handleServerTodolistResponse} from '../utils/error-utils';

export enum TLActionType {
    GET_TL = 'GET_TL',
    DELETE_TL = 'DELETE_TL',
    SET_FILTER = 'SET_FILTER',
    ADD_TL = 'ADD_TL',
    CHANGETITLE_TL = 'CHANGETITLE_TL',
    CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE_TODOLIST_ENTITY_STATUS'
}

export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>
type ActionTLType =
    ReturnType<typeof changeFilterTL_AC>
    | ReturnType<typeof deleteTL_AC>
    | ReturnType<typeof addTodolist_AC>
    | ReturnType<typeof changeTitleTL_AC>
    | ReturnType<typeof getTodolists_AC>
    | ChangeTodolistEntityStatusType


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodosType = TodolistAPIType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

let initialTL: Array<TodosType> = [
    // {id: todolistId1, title: 'What to learn', filter: 'all'},
    // {id: todolistId2, title: 'What to buy', filter: 'all'}
];

export const reducerTL = (state: Array<TodosType> = initialTL, action: ActionTLType): Array<TodosType> => {
    switch (action.type) {
        case TLActionType.GET_TL:
            // return action.todolists.map(m => ({...m, filter: localStorage.getItem(m.id) as FilterValuesType || 'all', entityStatus: 'idle'}))
            return action.todolists
        case TLActionType.ADD_TL:
            return [{...action.todo, filter: 'all', entityStatus: 'idle'}, ...state]
        case TLActionType.DELETE_TL:
            return state.filter(f => f.id !== action.id)
        case TLActionType.SET_FILTER:
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case TLActionType.CHANGETITLE_TL:
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case TLActionType.CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(m => m.id === action.todolistId ? {...m, entityStatus: action.entityStatus} : m)
        default:
            return state

    }
}

// Action creator

export const changeFilterTL_AC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: TLActionType.SET_FILTER,
        id: todolistId,
        filter
    } as const
}
export const deleteTL_AC = (todolistId: string) => {
    return {
        type: TLActionType.DELETE_TL,
        id: todolistId
    } as const
}
export const addTodolist_AC = (todo: TodolistAPIType) => {
    return {
        type: TLActionType.ADD_TL,
        todo,
    } as const
}
export const changeTitleTL_AC = (todolistId: string, title: string) => {
    return {
        type: TLActionType.CHANGETITLE_TL,
        id: todolistId,
        title
    } as const
}
export const getTodolists_AC = (todolists: Array<TodosType>) => {
    return {
        type: TLActionType.GET_TL,
        todolists
    } as const
}
export const changeTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: TLActionType.CHANGE_TODOLIST_ENTITY_STATUS,
        entityStatus,
        todolistId
    } as const
}

// Thunk creator

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            let todoWithFilter = res.data
                .map(m => ({...m, filter: getFilter(m.id), entityStatus: 'idle' as RequestStatusType}))
            dispatch(getTodolists_AC(todoWithFilter))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolist_AC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    handleServerTodolistResponse(todolistId, 'loading', dispatch)
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTL_AC(todolistId))
            handleServerTodolistResponse(todolistId, 'succeeded', dispatch)
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
        })
}
export const updateTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    handleServerTodolistResponse(todolistId, 'loading', dispatch)
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTitleTL_AC(todolistId, title))
            handleServerTodolistResponse(todolistId, 'succeeded', dispatch)
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(todolistId, 'failed'))
        })
}
export const saveFilterToLocalStorage = (todolists: Array<TodosType>) => () => {
    todolists.map(m => {
        return localStorage.setItem(m.id, m.filter)
    })
}




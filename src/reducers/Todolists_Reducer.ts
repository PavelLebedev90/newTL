import {Dispatch} from 'redux';
import {todolistAPI, TodolistAPIType} from '../api/TodolistAPI';

export enum TLActionType {
    GET_TL = 'GET_TL',
    DELETE_TL = 'DELETE_TL',
    SET_FILTER = 'SET_FILTER',
    ADD_TL = 'ADD_TL',
    CHANGETITLE_TL = 'CHANGETITLE_TL',
}


type ActionTLType =
    ReturnType<typeof changeFilterTL_AC>
    | ReturnType<typeof deleteTL_AC>
    | ReturnType<typeof addTodolist_AC>
    | ReturnType<typeof changeTitleTL_AC>
    | ReturnType<typeof getTodolists_AC>


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodosType =   TodolistAPIType & {
    filter: FilterValuesType
}

let initialTL: Array<TodosType> = [
    // {id: todolistId1, title: 'What to learn', filter: 'all'},
    // {id: todolistId2, title: 'What to buy', filter: 'all'}
];

export const reducerTL = (state: Array<TodosType> = initialTL, action: ActionTLType): Array<TodosType> => {
    switch (action.type) {
        case TLActionType.GET_TL:
            return action.todolists.map(m => ({...m, filter: 'all'}))
        case TLActionType.ADD_TL:
            return [{...action.todo, filter: 'all'},...state]
        case TLActionType.DELETE_TL:
            return state.filter(f => f.id !== action.id)
        case TLActionType.SET_FILTER:
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case TLActionType.CHANGETITLE_TL:
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
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
export const getTodolists_AC = (todolists: TodolistAPIType[]) => {
    return {
        type: TLActionType.GET_TL,
        todolists
    } as const
}

// Thunk creator

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(getTodolists_AC(res.data))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolist_AC(res.data.data.item))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(deleteTL_AC(todolistId))
        })
}
export const updateTodolistTC = (todolistId: string, title:string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTitleTL_AC(todolistId, title))
        })
}




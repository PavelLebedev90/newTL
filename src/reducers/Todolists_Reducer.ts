import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export const DELETE_TL = 'DELETE_TL'
const SET_FILTER = 'SET_FILTER'
export const ADD_TL = 'ADD_TL'
const CHANGETITLE_TL = 'CHANGETITLE_TL'



type ActionTLType =
    ReturnType<typeof changeFilterTL_AC> | ReturnType<typeof deleteTL_AC> | ReturnType<typeof addTodolist_AC> | ReturnType<typeof changeTitleTL_AC>
| ReturnType<typeof localTL>

export let todolistId1 = v1();
export let todolistId2 = v1();

let initialTL:Array<TodolistType> =  [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
];

export const reducerTL = (state:Array<TodolistType> = initialTL, action: ActionTLType): Array<TodolistType> => {
    switch (action.type) {
        case SET_FILTER:
            return state.map(m => m.id === action.id ? {...m, filter: action.filter} : m)
        case DELETE_TL:
            return state.filter(f => f.id !== action.id)
        case ADD_TL:
            let newTL:TodolistType = {id: action.id, title: action.title, filter: 'all'}
            return [...state, newTL]
        case CHANGETITLE_TL:
            return state.map(m => m.id === action.id ? {...m, title: action.title} : m)
        case "GET_LOCAL_TL":
            return action.payload.newTL ? JSON.parse(action.payload.newTL) : state
        default:
            return state

    }
}
    export const changeFilterTL_AC = (todolistId: string, filter: FilterValuesType) => {
        return {
            type: SET_FILTER,
            id: todolistId,
            filter
        } as const
    }
    export const deleteTL_AC = (todolistId: string) => {
        return {
            type: DELETE_TL,
            id: todolistId
        } as const
    }
    export const addTodolist_AC = (title:string) => {
        return {
            type: ADD_TL,
            id: v1(),
            title,
        } as const
    }
    export const changeTitleTL_AC = (todolistId: string, title: string) => {
        return {
            type: CHANGETITLE_TL,
            id: todolistId,
            title
        } as const
    }
    export const localTL = (newTL: string | null)=>{
    return{
        type: "GET_LOCAL_TL",
        payload:{
            newTL
        }
    }as const
}








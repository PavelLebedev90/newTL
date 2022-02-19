import {initialAPI} from './TaskAPI';

export type TodolistAPIType = {
        addedDate: string
        id: string
        order: number
        title: string
}
type CreateTLType = {
    data:{
        item:TodolistAPIType
    }
    resultCode: number
    messages: string[]
}
export const todolistAPI = {
    getTodolists(){
        return initialAPI.get<TodolistAPIType[]>(`/todo-lists`)
    },
    createTodolist(title:string){
        return initialAPI.post<CreateTLType>(`/todo-lists`, {title})
    },
    updateTodolist(todolistId:string, title:string){
        return initialAPI.put(`/todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId:string){
        return initialAPI.delete(`/todo-lists/${todolistId}`)
    }
}

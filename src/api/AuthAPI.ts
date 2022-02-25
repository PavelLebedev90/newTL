import {initialAPI} from './TaskAPI';
import {TodolistAPIType} from './TodolistAPI';

export type LoginParamsType = {
    email: string
    password:string
    rememberMe: boolean
    captcha?: string
}

type AuthLoginType = {
    data:{
        userId: number
    }
    resultCode: number
    messages: string[]
}
type AuthMeType = {
    data:{
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: string[]
}



export const authAPI = {
    login(data: LoginParamsType) {
        return initialAPI.post<AuthLoginType>(`/auth/login`, data)
    },
    me(){
        return initialAPI.get<AuthMeType>(`/auth/me`)
    },
    logout(){
        return initialAPI.delete(`/auth/login`)
    }
}

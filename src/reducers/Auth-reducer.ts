import {Dispatch} from 'redux'
import {AppErrorType, AppStatusType, setAppErrorAC, setAppStatusAC} from './App-reducer';
import {taskAPI, UpdateModalType} from '../api/TaskAPI';
import {handleServerNetworkError, handleServerTaskResponse} from '../utils/error-utils';
import {AxiosError} from 'axios';
import {changeTaskEntityStatusAC, updateTask_AC} from './Tasks_Reducer';
import {authAPI, LoginParamsType} from '../api/AuthAPI';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(res.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}



// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | AppStatusType | AppErrorType

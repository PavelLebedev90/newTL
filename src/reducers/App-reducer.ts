import {Dispatch} from 'redux';
import {authAPI} from '../api/AuthAPI';
import {setIsLoggedInAC} from './Auth-reducer';

export type RequestStatusType =
    'idle' | 'loading' | 'succeeded' | 'failed'


enum AppActionType  {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR',
    SET_IS_INITIALIZED = 'SET_IS_INITIALIZED'
}

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_STATUS:
        case AppActionType.SET_ERROR:
            return {
                ...state,
                 ...action.payload
            }
        case AppActionType.SET_IS_INITIALIZED:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType)=>{
    return{
        type: AppActionType.SET_STATUS,
        payload:{
            status
        }
    }
}
export const setIsInitializedAC = (isInitialized:boolean)=>{
    return{
        type: AppActionType.SET_IS_INITIALIZED,
        payload:{
            isInitialized
        }
    } as const
}
export const setAppErrorAC = (error: null | string)=>{
    return{
        type: AppActionType.SET_ERROR,
        payload:{
            error
        }
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    }).finally(()=>{
        dispatch(setIsInitializedAC(true))
    })
}

export type AppStatusType = ReturnType<typeof setAppStatusAC>
export type AppErrorType = ReturnType<typeof setAppErrorAC>
type ActionsType = AppStatusType | AppErrorType | ReturnType<typeof setIsInitializedAC>

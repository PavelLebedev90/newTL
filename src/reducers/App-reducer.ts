export type RequestStatusType =
    'idle' | 'loading' | 'succeeded' | 'failed'


enum AppActionType  {
    SET_STATUS = 'SET_STATUS',
    SET_ERROR = 'SET_ERROR'
}

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
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

export const setAppErrorAC = (error: null | string)=>{
    return{
        type: AppActionType.SET_ERROR,
        payload:{
            error
        }
    }
}
export type AppStatusType = ReturnType<typeof setAppStatusAC>
export type AppErrorType = ReturnType<typeof setAppErrorAC>
type ActionsType = AppStatusType | AppErrorType

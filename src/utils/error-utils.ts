import { Dispatch } from 'redux';
import {AxiosError} from 'axios';
import {AppErrorType, AppStatusType, RequestStatusType, setAppErrorAC, setAppStatusAC} from '../reducers/App-reducer';
import {changeTaskEntityStatusAC, ChangeTaskEntityStatusType} from '../reducers/Tasks_Reducer';
import {
    changeTodolistEntityStatusAC,
    ChangeTodolistEntityStatusType,
    FilterValuesType
} from '../reducers/Todolists_Reducer';

// generic function
export const handleServerTaskResponse =
    (todolistId: string, taskId:string, status: RequestStatusType, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC(status))
    dispatch(changeTaskEntityStatusAC(todolistId, status, taskId))
}
export const handleServerTodolistResponse =
    (todolistId: string, status: RequestStatusType, dispatch: ErrorUtilsDispatchType) => {
        dispatch(setAppStatusAC(status))
        dispatch(changeTodolistEntityStatusAC(todolistId, status))
    }

export const handleServerNetworkError = (error: AxiosError, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}


export const getFilter = (id:string)=>{
    return localStorage.getItem(id) as FilterValuesType || 'all'
}
type ErrorUtilsDispatchType = Dispatch<AppStatusType
    | AppErrorType | ChangeTaskEntityStatusType | ChangeTodolistEntityStatusType>

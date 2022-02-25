import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducerTasks} from '../reducers/Tasks_Reducer';
import {reducerTL} from '../reducers/Todolists_Reducer';
import thunk from 'redux-thunk';
import {appReducer} from '../reducers/App-reducer';
import {authReducer} from '../reducers/Auth-reducer';

// let stateFromLS;
// let stateString = localStorage.getItem('state')
// if(stateString){
//     stateFromLS = JSON.parse(stateString)
// }

let rootReducer = combineReducers({
    tasks: reducerTasks,
    todolists: reducerTL,
    app: appReducer,
    auth: authReducer
})


export type rootReducerType = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer, applyMiddleware(thunk))

// store.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(store.getState().todolists))
// })

//@ts-ignore
window.store = store

import {applyMiddleware, combineReducers, createStore} from 'redux';
import {reducerTasks} from '../reducers/Tasks_Reducer';
import {reducerTL} from '../reducers/Todolists_Reducer';
import thunk from 'redux-thunk';

let stateFromLS;
let stateString = localStorage.getItem('state')
if(stateString){
    stateFromLS = JSON.parse(stateString)
}

let rootReducer = combineReducers({
    tasks: reducerTasks,
    todolists: reducerTL
})


export type rootReducerType = ReturnType<typeof rootReducer>;
export let store = createStore(rootReducer, applyMiddleware(thunk))

// store.subscribe(() => {
//     localStorage.setItem('state', JSON.stringify(store.getState()))
// })

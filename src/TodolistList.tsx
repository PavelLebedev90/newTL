import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from '@mui/material';
import AddItem from './components/AddItem';
import {Todolist} from './Todolist';
import {createTodolistTC, getTodolistsTC, saveFilterToLocalStorage, TodosType} from './reducers/Todolists_Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';
import {Navigate} from 'react-router-dom';

const TodolistList = () => {
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<rootReducerType, TodosType[]>(state => state.todolists)
    const dispatch = useDispatch()
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodolistsTC())
        }
    }, [])

    useEffect(() => {
        dispatch(saveFilterToLocalStorage(todolists))
    }, [todolists])
    if (!isLoggedIn) {
       return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItem addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        return (
                            <Grid item
                                  key={tl.id}>

                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default TodolistList;

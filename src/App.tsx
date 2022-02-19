import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItem from './components/AddItem';
import {createTodolistTC, getTodolistsTC, saveFilterToLocalStorage, TodosType} from './reducers/Todolists_Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';

import {RequestStatusType} from './reducers/App-reducer';
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from './components/ErrorSnackbar';


function App() {

    let dispatch = useDispatch();
    let todolists = useSelector<rootReducerType, Array<TodosType>>(state => state.todolists)
    let status = useSelector<rootReducerType, RequestStatusType>(state => state.app.status)
    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    useEffect(() => {
        dispatch(saveFilterToLocalStorage(todolists))
    }, [todolists])

    return (

        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'}
                                color={'inherit'}
                                area-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            {
                status === 'loading' &&
                <LinearProgress color="primary" style={{position: 'relative'}}/>
            }
            <Container fixed>
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
            </Container>
        </div>
    );
}

export default App;

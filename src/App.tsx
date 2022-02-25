import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import AddItem from './components/AddItem';
import {createTodolistTC, getTodolistsTC, saveFilterToLocalStorage, TodosType} from './reducers/Todolists_Reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootReducerType} from './store/store';

import {initializeAppTC, RequestStatusType} from './reducers/App-reducer';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from './components/ErrorSnackbar';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Login} from './components/Login';
import TodolistList from './TodolistList';
import {logoutTC} from './reducers/Auth-reducer';


function App() {
    const dispatch = useDispatch()
    let status = useSelector<rootReducerType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<rootReducerType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
    dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logout = () => {
      dispatch(logoutTC())
    }

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
                    {isLoggedIn && <Button color={'inherit'} onClick={logout}>Logout</Button>}
                </Toolbar>
            </AppBar>
            {
                status === 'loading' &&
                <LinearProgress color="primary" style={{position: 'relative'}}/>
            }
            <Container fixed>
                <Routes>
                    <Route path="newTL/login" element={<Login/>}/>
                    <Route path="newTL/" element={<TodolistList/>}/>
                    <Route path="newTL/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'newTL/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;

import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './views/login/index';
import Register from './views/register/index';

export default function RoutesComponent() {
    return(
        <Routes>          
                <Route
                    exact path = '/login'
                    element = {<Login />}
                />

                <Route
                    exact path = '/register'
                    element = {<Register />}
                />


        </Routes>
    );
};
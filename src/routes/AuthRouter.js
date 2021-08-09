import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom';
import { useStyles } from '../common/estilos';
import { Login } from '../components/auth/Login';
import { RegistroDoctor } from '../components/register/RegistroDoctor';


export const AuthRouter = () => {

    const classes = useStyles();

    return (
        <div className={classes.divLogin}>
            <Switch>
                <Route
                    exact
                    path="/auth/login"
                    component={Login}
                />

                <Route
                    exact
                    path="/auth/register"
                    component={RegistroDoctor}
                />

                <Redirect to="/auth/login" />


            </Switch>
        </div>

    )
}

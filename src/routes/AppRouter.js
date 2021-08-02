import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { AppBarPer } from '../components/AppBarPer';
import { Main } from '../components/Main';

import { useStyles } from '../common/estilos'
import { Lista } from '../components/solicitud/Lista';
import { Registro } from '../components/register/Registro';

export const AppRouter = () => {

    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBarPer />
                <Switch>
                    <Route
                        path="/auth/login"
                        component={Lista}
                    />

                    <Route
                        path="/main"
                        component={Main}
                    />

                    <Route
                        path="/registro"
                        component={Registro}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}

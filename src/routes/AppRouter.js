import React, { useEffect, useState } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom';
import { AppBarPer } from '../components/AppBarPer';
import { Main } from '../components/Main';

// import { useStyles } from '../common/estilos'
import { Lista } from '../components/solicitud/Lista';
import { Registro } from '../components/register/Registro';
import { RegistroDoctor } from '../components/register/RegistroDoctor';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch } from 'react-redux';
import { Caledario } from '../components/reserva/Caledario';
import { Perfil } from '../components/user/Perfil';
import { Cita } from '../components/cita/Cita';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);



    useEffect(() => {

        let auth = localStorage.getItem('is-auth');
        let token = localStorage.getItem('access-token');
        let userId = localStorage.getItem('user-id');

        if(auth !== isLoggedIn.toString()){
            if (auth === 'true') {
                dispatch(login(userId, token, auth));
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }


    }, [dispatch, setIsLoggedIn])

    return (
        <Router>
            <div className="root">
                <AppBarPer />
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        strict
                        path="/main"
                        component={Main}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        strict
                        path="/lista"
                        component={Lista}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        strict
                        path="/registro"
                        component={Registro}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRoute
                        strict
                        path="/registro-doc"
                        component={RegistroDoctor}
                        isAuthenticated={isLoggedIn}
                    />
                    
                    <Route 
                        exact
                        path="/calendar"
                        component={Caledario}
                    />
                    <Route 
                        exact
                        path="/perfil"
                        component={Perfil}
                    />
                    <Route 
                        exact
                        path="/cita"
                        component={Cita}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}

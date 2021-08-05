import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Main } from '../components/Main';


export const AuthRouter = () => {
    return (
        <div className="">
            <div className="">
                <Switch>
                    <Route 
                        exact
                        path="/auth/login"
                        component={ Login }
                    />

                    <Route 
                        exact
                        path="/auth/register"
                        component={ Login }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>

        </div>
    )
}

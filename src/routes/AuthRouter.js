import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom';
import { Main } from '../components/Main';


export const AuthRouter = () => {
    return (
        <div className="">
            <div className="">
                <Switch>
                    <Route 
                        exact
                        path="/auth/login"
                        component={ Main }
                    />

                    <Route 
                        exact
                        path="/auth/register"
                        component={ Main }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>

        </div>
    )
}

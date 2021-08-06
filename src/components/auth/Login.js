import { Card, CardContent, Typography, CardActions, FormControl, Button, Input, InputLabel, InputAdornment } from '@material-ui/core'
import { AccountCircle, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { login, startLoginEmailPassword } from '../../actions/auth';
import { useStyles } from '../../common/estilos';
import { fetchSinToken } from '../../common/fetcher';
import { useForm } from '../../hooks/useForm'

export const Login = () => {

    const dispatch = useDispatch()

    const {loggued} = useSelector( state => state.auth)

    const classes = useStyles();

    const [redirect, setRedirect] = useState('false')

    const { values, handleInputChange } = useForm({
        email: '', contraseña: ''
    });

    const { email, contraseña } = values;

    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(startLoginEmailPassword(email, contraseña))      

        
        if (email === '' && contraseña === '') {
            return;
        } else {
            console.log('Redireccionando')
            setRedirect('true');
        }
    }


    return (
        <div style={{paddingLeft: 'auto', paddingRight: 'auto'}}>
            <Card className={classes.margin} variant="outlined" >

                <form onSubmit={handleLogin}>
                    <CardContent>
                        <FormControl className={classes.margin} onChange={handleInputChange} required >
                            <InputLabel>Correo</InputLabel>
                            <Input
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                type="text"
                                name="email"
                                value={email}
                                required={true}
                                onChange={handleInputChange}
                                error={email.length > 0 ? false : true}
                            />
                        </FormControl>

                        <FormControl className={classes.margin} onChange={handleInputChange} required >
                            <InputLabel>Contraseña</InputLabel>
                            <Input
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VisibilityOff />
                                    </InputAdornment>
                                }
                                type="text"
                                name="contraseña"
                                value={contraseña}
                                required={true}
                                onChange={handleInputChange}
                                error={contraseña.length > 0 ? false : true}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button size='meddium' type="submit" onClick={handleLogin}>Log In</Button>
                        {!loggued ? null :  <Redirect to="/main" />}
                    </CardActions>
                </form>
            </Card>
        </div>
    )
}

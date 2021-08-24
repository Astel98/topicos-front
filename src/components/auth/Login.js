import { Card, CardContent, Typography, CardActions, FormControl, Button, Input, InputLabel, InputAdornment } from '@material-ui/core'
import { AccountCircle, VisibilityOff } from '@material-ui/icons';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { startLoginEmailPassword } from '../../actions/auth';
import { useStyles } from '../../common/estilos';
import { useForm } from '../../hooks/useForm'

export const Login = () => {

    const dispatch = useDispatch()

    const { loggued } = useSelector(state => state.auth)


    const [redirect, setRedirect] = useState('false')

    const { values, handleInputChange } = useForm({
        email: '', contraseña: ''
    });

    const { email, contraseña } = values;

    const handleLogin = async (e) => {
        e.preventDefault()


        if (email === '' | contraseña === '') {
            return;
        } else {
            console.log('Redireccionando')
            dispatch(startLoginEmailPassword(email, contraseña))
            // setRedirect(localStorage.getItem('is-auth'));
        }
    }


    return (
        <>
            <Card className="card-login" variant="outlined" >
                <Typography variant='h6' className="bot-text">
                    IClounic - Ingresa
                </Typography>

                <form onSubmit={handleLogin}>
                    <CardContent>
                        <FormControl className="login-field" style={{padding: '5px  5px 20px 5px'}} onChange={handleInputChange} required >
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

                        <br />

                        <FormControl className="login-field" style={{padding: '5px  5px 20px 5px'}} onChange={handleInputChange} required >
                            <InputLabel>Contraseña</InputLabel>
                            <Input
                                startAdornment={
                                    <InputAdornment position="start">
                                        <VisibilityOff />
                                    </InputAdornment>
                                }
                                type="password"
                                name="contraseña"
                                value={contraseña}
                                required={true}
                                onChange={handleInputChange}
                                error={contraseña.length > 0 ? false : true}
                            />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button className="center-button"
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleLogin}>
                            Ingresar
                        </Button>
                        {localStorage.getItem('is-auth') !== 'true' ? null : <Redirect to="/main" />}
                    </CardActions>
                </form>
                <Typography variant='subtitle1' className="bot-text">
                    ¿No tienes cuenta?
                    <Link to="/auth/register"> Registrate </Link>
                </Typography>
            </Card>
        </>
    )
}

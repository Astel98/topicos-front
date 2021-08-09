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
        <>
            <Card className={classes.cardLogin} variant="outlined" >
                <Typography variant='h6' className={classes.botText}>
                    IClounic - Ingresa
                </Typography>

                <form onSubmit={handleLogin}>
                    <CardContent>
                        <FormControl className={classes.loginInput} onChange={handleInputChange} required >
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

                        <FormControl className={classes.loginInput} onChange={handleInputChange} required >
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
                        <Button className={classes.button}
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={handleLogin}>
                            Ingresar
                        </Button>
                        {!loggued ? null : <Redirect to="/main" />}
                    </CardActions>
                </form>
                <Typography variant='subtitle1' className={classes.botText}>
                    ¿No tienes cuenta?
                    <Link to="/auth/register"> Registrate </Link>
                </Typography>
            </Card>
        </>
    )
}

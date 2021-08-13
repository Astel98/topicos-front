import { Button, Container, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React from 'react'

import { useStyles } from '../../common/estilos'
import { useForm } from '../../hooks/useForm';
import Paper from '@material-ui/core/Paper';
import { AccountCircle, Event, VisibilityOff, AlternateEmail, AddIcCall, Home } from '@material-ui/icons';
import { fetchSinToken } from '../../common/fetcher';


export const Registro = () => {

    const classes = useStyles();

    const { values, handleInputChange } = useForm({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        confirmar: '',
        telefono: 0,
        ci: 0,
        direccion: '',
        fecha_nac: '01-01-1990',
        rol: 1

    });

    const registrar = async () => {
        const userData = {
            'persona': {
                'nombres': nombre,
                'apellidos': apellido,
                'telefono': Number(telefono),
                'ci': Number(ci),
                'usuario': {
                    'correo_electronico': correo,
                    'password': contraseña
                }
            }
        }

        console.log(JSON.stringify(userData))

        const resp = await fetchSinToken('administradores', userData, 'POST');

        console.log(resp)

        if (resp.ok) {
            alert("Usuario Administrador creado Exitosamente")
        } else {
            console.log("AAAAAAAAAAa ERRORRRRR");
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contraseñas no coinciden");
        if (contraseña === confirmar) {
            registrar();
        } else {
            alert("Contraseñas no coinciden");
        }
    }

    const { nombre, apellido, correo, contraseña, confirmar, telefono, ci, direccion, fecha_nac, rol } = values;

    return (

        <Container maxWidth="md" component={Paper} style={{ paddingTop: "100px" }}>

            <h2>Registro Administrador</h2>



            <form className={classes.divLogin} noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={1} alignContent="center" alignItems="center">
                    <Grid container xs={"auto"} item spacing={1}>

                        <Grid container item xs={8} spacing={1}>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required >
                                    <InputLabel>Nombre(s)</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="nombre"
                                        value={nombre}
                                        required
                                        onChange={handleInputChange}
                                        error={nombre.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Apellido(s)</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="apellido"
                                        value={apellido}
                                        required
                                        error={apellido.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Nro. Celular</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AddIcCall />
                                            </InputAdornment>
                                        }
                                        type="number"
                                        name="telefono"
                                        value={telefono}
                                        required
                                        error={telefono.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Nro. CI</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="number"
                                        name="ci"
                                        value={ci}
                                        required
                                        error={ci.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} >
                                    <InputLabel htmlFor="input-with-icon-adornment">Direccion</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Home />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="direccion"
                                        value={direccion}
                                        required
                                        error={direccion.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Fecha Nacimiento</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Event />
                                            </InputAdornment>
                                        }
                                        type="date"
                                        name="fecha_nac"
                                        value={fecha_nac}
                                        required
                                        error={fecha_nac.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                        </Grid>
                        <Grid container item xs={4} spacing={1}>
                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Correo</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AlternateEmail />
                                            </InputAdornment>
                                        }
                                        type="email"
                                        name="correo"
                                        value={correo}
                                        required
                                        error={correo.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Contraseña</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <VisibilityOff />
                                            </InputAdornment>
                                        }
                                        type="password"
                                        name="contraseña"
                                        value={contraseña}
                                        required
                                        error={contraseña.length > 0 ? false : true}
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Confirmar</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <VisibilityOff />
                                            </InputAdornment>
                                        }
                                        type="password"
                                        name="confirmar"
                                        value={confirmar}
                                        required
                                        error={confirmar.length > 0 ? false : true}

                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel id="rol">Rol</InputLabel>
                                    <Select
                                        labelId="rol"
                                        id="rol-pick"
                                        value={rol}
                                        name="rol"
                                        onChange={handleInputChange}

                                    >
                                        <MenuItem value={1}>Admin General</MenuItem>
                                        <MenuItem value={2}>Admin Funcional</MenuItem>
                                        <MenuItem value={3}>Admin Config</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <h3>{rol}</h3> */}
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container xs={"auto"} item spacing={3}>
                        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <Button variant="contained" color="primary" type="submit">
                                Registrar
                            </Button>
                        </div>
                    </Grid>
                </Grid>

            </form>




        </Container>
    )
}
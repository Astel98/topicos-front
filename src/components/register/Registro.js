import { Button, Container, FormControl, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import React from 'react'

import { useStyles } from '../../common/estilos'
import { useForm } from '../../hooks/useForm';
import Paper from '@material-ui/core/Paper';
import { AccountCircle, Event, VisibilityOff, AlternateEmail, AddIcCall, Home } from '@material-ui/icons';



export const Registro = () => {

    const classes = useStyles();

    const { values, handleInputChange } = useForm({
        nobmre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        confirmar: '',
        telefono: 0,
        ci: '',
        direccion: '',
        fecha_nac: '01-01-1990'

    });

    const { nombre, apellido, correo, contraseña, confirmar, telefono, ci, direccion, fecha_nac } = values;

    return (

        <Container maxWidth="sm" component={Paper} style={{ paddingTop: "100px" }}>

            <h2>Formulario Registro</h2>

            <form className={classes.root} noValidate autoComplete="off">
                <div className="col">

                    <div className="row" style={{ padding: "1rem" }}>
                        <FormControl className={classes.margin} onChange={handleInputChange} required>
                            <InputLabel htmlFor="input-with-icon-adornment">Nombre(s)</InputLabel>
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
                                type="text"
                                name="ci"
                                value={ci}
                            />
                        </FormControl>
                    </div>

                    <div className="row" style={{ padding: "1rem" }}>
                        <FormControl className={classes.margin} onChange={handleInputChange} required>
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
                            />
                        </FormControl>
                    </div>

                </div>

                <div className="col">

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
                            />
                        </FormControl>
                    </div>

                    <div className="row" style={{ padding: "1rem" }}>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                        >
                            Subir Foto
                            <input
                                type="file"
                                hidden
                                name="foto"
                            />
                        </Button>
                    </div>


                </div>

                <div style={{marginRight:"auto", marginLeft:"auto"}}>
                <Button variant="contained" color="primary">
                    Primary
                </Button>
            </div>

            </form>
            

        </Container>
    )
}

import { Button, Container, FormControl, Grid, Input, InputAdornment, Select, InputLabel, MenuItem, TextField } from '@material-ui/core';
import React from 'react'

import { useStyles } from '../../common/estilos'
import { useForm, useFormDoc } from '../../hooks/useForm';
import Paper from '@material-ui/core/Paper';
import { AccountCircle, Event, VisibilityOff, AlternateEmail, AddIcCall, Home, LocalHospital } from '@material-ui/icons';
import { fetchSinToken, fetchSinTokenDoc } from '../../common/fetcher';



export const RegistroDoctor = () => {

    const classes = useStyles();

    const { values, handleInputChange } = useForm({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        confirmar: '',
        telefono: 0,
        ci: '',
        direccion: '',
        laboral: '',
        fecha_nac: '01-01-1990',
        codigo: '',
        pathFoto: '',
        pathCI: '',
        pathTitulo: '',
        especialidad: 1,
        genero: "M"

    });

    const { docs, handleInputChangeDoc } = useFormDoc({
        pathFoto: '',
        pathCI: '',
        pathTitulo: ''

    });

    const { pathFoto, pathCI, pathTitulo } = docs;

    const { nombre, apellido, correo, contraseña, confirmar, laboral, especialidad,
        telefono, ci, direccion, fecha_nac, codigo, genero } = values;

    const registrar = async () => {
        const userData = {
            "persona": {
                "nombres": nombre,
                "apellidos": apellido,
                "telefono": Number(telefono),
                "ci": Number(ci),
                "usuario": {
                    "correo_electronico": correo,
                    "password": contraseña
                }
            },
            "telefono_oficina": Number(telefono),
            "direccion_laboral": laboral,
            "fecha_nacimiento": fecha_nac,
            "sexo": genero,
            "codigo_ss": codigo,
            "especialidades": [
                especialidad
            ]
        }

        var dataDoc = new FormData()
        dataDoc.append('ci', ci);
        dataDoc.append('ci_img', docs.pathCI);
        dataDoc.append('img', docs.pathFoto);
        dataDoc.append('titulo', docs.pathTitulo);

        console.log(JSON.stringify(userData))
        console.log(JSON.stringify(dataDoc))

        try {
            const resp = await fetchSinToken('doctores', userData, 'POST');
            console.log("Parse Body")
            // const body = await resp.json();

            const respDoc = await fetchSinTokenDoc('doctores/enviar_archivos', dataDoc, 'POST');
            console.log("Parse Body Doc")
            // const bodyDoc = await respDoc.json();

            console.log(resp)
            // console.log(body)
            console.log(respDoc)
            // console.log(bodyDoc)

            if (resp.ok && respDoc.ok) {
                alert("CREADO")
                console.log(JSON.stringify(resp));
                console.log(JSON.stringify(respDoc));
            } else {
                console.log("AAAAAAAAAAa ERRORRRRR");
            }

        } catch (error) {
            console.log(error);
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


    return (

        <Container maxWidth="md" component={Paper} style={{ paddingTop: "100px" }}>

            <h2>Formulario Registro</h2>



            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={1} alignContent="center" alignItems="center">
                    <Grid container xs={"auto"} item spacing={1}>

                        <Grid container item xs={4} spacing={1}>

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
                                        error={nombre.length>0 ? false : true }
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
                                        error={apellido.length>0 ? false : true }
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
                                        error={telefono.length>0 ? false : true }
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
                                        error={ci.length>0 ? false : true }
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
                                        error={direccion.length>0 ? false : true }
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Direccion Laboral</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Home />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="laboral"
                                        value={laboral}
                                        error={laboral.length>0 ? false : true }
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
                                        error={fecha_nac.length>0 ? false : true }
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel id="genero">genero</InputLabel>
                                    <Select
                                        labelId="genero"
                                        id="genero-pick"
                                        value={genero}
                                        name="genero"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={"M"}>Hombre</MenuItem>
                                        <MenuItem value={"F"}>Mujer</MenuItem>
                                        <MenuItem value={"O"}>Otro</MenuItem>
                                    </Select>
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
                                        error={correo.length>0 ? false : true }
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
                                        error={contraseña.length>0 ? false : true }
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
                                        error={confirmar.length>0 ? false : true }
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel htmlFor="input-with-icon-adornment">Codigo Doctor</InputLabel>
                                    <Input
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LocalHospital />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="codigo"
                                        value={codigo}
                                        error={codigo.length>0 ? false : true }
                                    />
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} onChange={handleInputChange} required>
                                    <InputLabel id="especialidad">Especialidad</InputLabel>
                                    <Select
                                        labelId="especialidad"
                                        id="especialidad-pick"
                                        value={especialidad}
                                        name="especialidad"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value={1}>Pediatra</MenuItem>
                                        <MenuItem value={2}>Neurologo</MenuItem>
                                        <MenuItem value={3}>General</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>


                        </Grid>
                        <Grid container item xs={4} spacing={1}>


                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{width: "250px"}}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    Subir Foto Personal
                                    <input
                                        type="file"
                                        hidden
                                        name="pathFoto"

                                        onChange={handleInputChangeDoc}
                                        accept=".jpg,.jpeg,.png"
                                    />
                                </Button>

                                <h3>{pathFoto.toString()}</h3>

                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{width: "250px"}}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    Subir Foto CI
                                    <input
                                        type="file"
                                        hidden
                                        name="pathCI"

                                        onChange={handleInputChangeDoc}
                                        accept=".jpg,.jpeg,.png"
                                    />
                                </Button>

                                <h3>{pathCI.toString()}</h3>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{width: "250px"}}
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                >
                                    Subir Foto Titulo
                                    <input
                                        type="file"
                                        hidden
                                        name="pathTitulo"

                                        onChange={handleInputChangeDoc}
                                        accept=".jpg,.jpeg,.png"
                                    />
                                </Button>

                                <h3>{pathTitulo.toString()}</h3>


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
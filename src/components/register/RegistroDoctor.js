import {
    Button,
    Container,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    Select,
    InputLabel,
    MenuItem,
    FormHelperText
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'

import { useFormDoc } from '../../hooks/useForm';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
    AccountCircle,
    VisibilityOff,
    AlternateEmail,
    AddIcCall,
    Home,
    LocalHospital
} from '@material-ui/icons';
import { fetchSinToken, fetchSinTokenDoc, fetchSinTokenJSON } from '../../common/fetcher';
import { alertaError, alertaSuccess } from '../../common/alertas';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const RegistroDoctor = () => {

    const classes = useStyles();

    const { docs, handleInputChangeDoc } = useFormDoc({
        pathFoto: '',
        pathCI: '',
        pathTitulo: ''

    });

    const [listaEsp, setListaEsp] = useState([]);

    const { pathFoto, pathCI, pathTitulo } = docs;

    const [nombre, setNombre] = useState("");
    const [nombreError, setNombreError] = useState(false);
    const [nombreErrorMensaje, setNombreErrorMensaje] = useState("");

    const [apellido, setApellido] = useState("");
    const [apellidoError, setApellidoError] = useState(false);
    const [apellidoErrorMensaje, setApellidoErrorMensaje] = useState("");

    const [telefono, setTelefono] = useState("");
    const [telefonoError, setTelefonoError] = useState(false);
    const [telefonoErrorMensaje, setTelefonoErrorMensaje] = useState("");

    const [ci, setCi] = useState("");
    const [ciError, setCiError] = useState(false);
    const [ciErrorMensaje, setCiErrorMensaje] = useState("");

    const [direccion, setDireccion] = useState("");
    const [direccionError, setDireccionError] = useState(false);
    const [direccionErrorMensaje, setDireccionErrorMensaje] = useState("");

    const [direccionLaboral, setDireccionLaboral] = useState("");
    const [direccionLaboralError, setDireccionLaboralError] = useState(false);
    const [direccionLaboralErrorMensaje, setDireccionLaboralErrorMensaje] = useState("");

    const [fechaDeNacimiento, setFechaDeNacimiento] = useState(new Date());

    const [genero, setGenero] = useState("");

    const [especialidad, setEspecialidad] = useState("");


    const [correoElectronico, setCorreoElectronico] = useState("");
    const [correoElectronicoError, setCorreoElectronicoError] = useState(false);
    const [correoElectronicoErrorMensaje, setCorreoElectronicoErrorMensaje] = useState("");

    const [contrasena, setContrasena] = useState("");
    const [contrasenaError, setContrasenaError] = useState(false);
    const [contrasenaErrorMensaje, setContrasenaErrorMensaje] = useState("");

    const [contrasenaConfirmada, setContrasenaConfirmada] = useState("");
    const [contrasenaConfirmadaError, setContrasenaConfirmadaError] = useState(false);
    const [contrasenaConfirmadaErrorMensaje, setContrasenaConfirmadaErrorMensaje] = useState("");

    const [codigoDoctor, setCodigoDoctor] = useState("");
    const [codigoDoctorError, setCodigoDoctorError] = useState(false);
    const [codigoDoctorErrorMensaje, setCodigoDoctorErrorMensaje] = useState("");

    const registrar = async () => {
        const userData = {
            "persona": {
                "nombres": nombre,
                "apellidos": apellido,
                "telefono": Number(telefono),
                "ci": Number(ci)
            },
            "usuario": {
                "correo_electronico": correoElectronico,
                "contrasena": contrasena
            },
            "doctor": {
                "direccion_laboral": direccionLaboral,
                "fecha_nacimiento": fechaDeNacimiento,
                "sexo": genero,
                "codigo_ss": codigoDoctor,
                "especialidad_id": Number(especialidad)
            }
        }


        var dataDoc = new FormData()
        dataDoc.append('ci_img', pathCI);
        dataDoc.append('img', pathFoto);
        dataDoc.append('titulo', pathTitulo);

        console.log(JSON.stringify(userData))
        console.log(JSON.stringify(dataDoc))

        try {
            const resp = await fetchSinTokenJSON('solicitudes', userData, 'POST')
            dataDoc.append('persona_id', resp.body.persona.id);
                const respDoc = await fetchSinTokenDoc('doctores/archivos', dataDoc, 'POST')
                console.log(resp)
                console.log(respDoc)

                

                if (resp.ok && respDoc.ok) {
                    alertaSuccess('Usuario creado exitosamente')
                } else {
                    // alertaError('Error durante la creacion de usuario');
                }


            // console.log(bodyDoc)

           

        } catch (error) {
            console.log(error);
        }

        alertaSuccess('Usuario creado exitosamente')


    }

    const getEspecialidades = async () => {
        const resp = await fetchSinToken('especialidades', '', 'GET');
        console.log(resp);
        const body = await resp.json();
        console.log(body);
        setListaEsp(body);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // for (let key in values) {
        //     if (values[key].toString().length <= 0) {
        //         alertaError(`${key} no debe estar vacio`);
        //         return;
        //     }
        // }

        if (contrasena === contrasenaConfirmada) {
            registrar();
        } else {
            alertaError('Contraseñas no coinciden')
        }
    }

    const handleNombreBlur = () => {
        if (nombre.length === 0) {
            setNombreError(true)
            setNombreErrorMensaje("Este campo es requerido.")
        }
    }

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
        if (event.target.value.length > 0) {
            setNombreError(false);
            setNombreErrorMensaje("");
        } else {
            setNombreError(true)
            setNombreErrorMensaje("Este campo es requerido.")
        }
    }

    const handleApellidoBlur = () => {
        if (apellido.length === 0) {
            setApellidoError(true)
            setApellidoErrorMensaje("Este campo es requerido.")
        }
    }

    const handleApellidoChange = (event) => {
        setApellido(event.target.value);
        if (event.target.value.length > 0) {
            setApellidoError(false);
            setApellidoErrorMensaje("");
        } else {
            setApellidoError(true)
            setApellidoErrorMensaje("Este campo es requerido.")
        }
    }

    const handleTelefonoBlur = () => {
        if (telefono.length === 0) {
            setTelefonoError(true)
            setTelefonoErrorMensaje("Este campo es requerido.")
        }
    }

    const handleTelefonoChange = (event) => {
        setTelefono(event.target.value);
        if (event.target.value.length > 0) {
            if (isNaN(event.target.value)) {
                setTelefonoError(true);
                setTelefonoErrorMensaje("Solo se admiten valores numéricos.")
            } else {
                setTelefonoError(false);
                setTelefonoErrorMensaje("");
            }
        } else {
            setTelefonoError(true)
            setTelefonoErrorMensaje("Este campo es requerido.")
        }
    }

    const handleCiBlur = () => {
        if (telefono.length === 0) {
            setCiError(true)
            setCiErrorMensaje("Este campo es requerido.")
        }
    }

    const handleCiChange = (event) => {
        setCi(event.target.value);
        if (event.target.value.length > 0) {
            if (isNaN(event.target.value)) {
                setCiError(true);
                setCiErrorMensaje("Solo se admiten valores numéricos.")
            } else {
                setCiError(false);
                setCiErrorMensaje("");
            }
        } else {
            setCiError(true)
            setCiErrorMensaje("Este campo es requerido.")
        }
    }

    const handleDireccionBlur = () => {
        if (direccion.length === 0) {
            setDireccionError(true)
            setDireccionErrorMensaje("Este campo es requerido.")
        }
    }

    const handleDireccionChange = (event) => {
        setDireccion(event.target.value);
        if (event.target.value.length > 0) {
            setDireccionError(false);
            setDireccionErrorMensaje("");
        } else {
            setDireccionError(true)
            setDireccionErrorMensaje("Este campo es requerido.")
        }
    }

    const handleDireccionLaboralBlur = () => {
        if (direccion.length === 0) {
            setDireccionLaboralError(true)
            setDireccionLaboralErrorMensaje("Este campo es requerido.")
        }
    }

    const handleDireccionLaboralChange = (event) => {
        setDireccionLaboral(event.target.value);
        if (event.target.value.length > 0) {
            setDireccionLaboralError(false);
            setDireccionLaboralErrorMensaje("");
        } else {
            setDireccionLaboralError(true)
            setDireccionLaboralErrorMensaje("Este campo es requerido.")
        }
    }

    const handleGeneroChange = (event) => {
        setGenero(event.target.value);
        console.log(event.target.value);
    }

    const handleEspecialidadChange = (event) => {
        setEspecialidad(event.target.value);
        console.log(event.target.value);
    }

    const handleCorreoElectronicoBlur = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (correoElectronico.length === 0) {
            setCorreoElectronicoError(true)
            setCorreoElectronicoErrorMensaje("Este campo es requerido.")
        } else if (!re.test(String(correoElectronico).toLowerCase())) {
            setCorreoElectronicoError(true)
            setCorreoElectronicoErrorMensaje("Ingrese un correo válido.")
        }
    }

    const handleCorreoElectronicoChange = (event) => {
        setCorreoElectronico(event.target.value)
        if (event.target.value.length > 0) {
            setCorreoElectronicoError(false);
            setCorreoElectronicoErrorMensaje("");
        } else {
            setCorreoElectronicoError(true)
            setCorreoElectronicoErrorMensaje("Este campo es requerido.")
        }
    }

    const handleContrasenaBlur = () => {
        if (contrasena.length === 0) {
            setContrasenaError(true)
            setContrasenaErrorMensaje("Este campo es requerido.")
        }
    }

    const handleContrasenaChange = (event) => {
        setContrasena(event.target.value);
        if (event.target.value.length < 8) {
            setContrasenaError(true)
            setContrasenaErrorMensaje("La contraseña debe tener mínimo 8 caracteres.")
        } else {
            setContrasenaError(false)
            setContrasenaErrorMensaje("")
        }
    }

    const handleContrasenaConfirmadaBlur = () => {
        if (contrasenaConfirmada.length === 0) {
            setContrasenaConfirmadaError(true)
            setContrasenaConfirmadaErrorMensaje("Este campo es requerido.")
        }
    }

    const handleContrasenaConfirmadaChange = (event) => {
        setContrasenaConfirmada(event.target.value);
        if (event.target.value !== contrasena) {
            setContrasenaConfirmadaError(true)
            setContrasenaConfirmadaErrorMensaje("Las contraseñas no coinciden.")
        } else {
            setContrasenaConfirmadaError(false)
            setContrasenaConfirmadaErrorMensaje("")
        }
    }

    const handleCodigoDoctorBlur = () => {
        if (codigoDoctor.length === 0) {
            setCodigoDoctorError(true);
            setCodigoDoctorErrorMensaje("Este campo es requerido.");
        }
    }

    const handleCodigoDoctorChange = (event) => {
        setCodigoDoctor(event.target.value);
        if (event.target.value.length > 0) {
            setCodigoDoctorError(false);
            setCodigoDoctorErrorMensaje("");
        } else {
            setCodigoDoctorError(true)
            setCodigoDoctorErrorMensaje("Este campo es requerido.")
        }
    }

    useEffect(() => {
        getEspecialidades()
    }, [])

    return (

        <Container className={classes.divLogin} maxWidth="md" component={Paper}>

            <h2>Formulario Registro</h2>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={1} alignContent="center" alignItems="center">
                    <Grid container xs={"auto"} item spacing={1}>

                        <Grid container item xs={4} spacing={1}>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Nombre(s)</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="nombre"
                                        label="Nombre(s)*"
                                        variant="outlined"
                                        inputVariant="outlined"
                                        value={nombre}
                                        error={nombreError}
                                        onChange={handleNombreChange}
                                        onBlur={handleNombreBlur}
                                    />
                                    <FormHelperText>{nombreErrorMensaje}</FormHelperText>
                                </FormControl>

                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Apellido(s)</InputLabel>
                                    <Input
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="apellido"
                                        inputVariant="outlined"
                                        value={apellido}
                                        error={apellidoError}
                                        onChange={handleApellidoChange}
                                        onBlur={handleApellidoBlur}
                                    />
                                    <FormHelperText>{apellidoErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Nro. Celular</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AddIcCall />
                                            </InputAdornment>
                                        }
                                        type="number"
                                        name="telefono"
                                        inputVariant="outlined"
                                        value={telefono}
                                        error={telefonoError}
                                        onChange={handleTelefonoChange}
                                        onBlur={handleTelefonoBlur}
                                    />
                                    <FormHelperText>{telefonoErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Nro. CI</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="ci"
                                        inputVariant="outlined"
                                        value={ci}
                                        error={ciError}
                                        onChange={handleCiChange}
                                        onBlur={handleCiBlur}
                                    />
                                    <FormHelperText>{ciErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Direccion</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Home />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="direccion"
                                        inputVariant="outlined"
                                        value={direccion}
                                        error={direccionError}
                                        onChange={handleDireccionChange}
                                        onBlur={handleDireccionBlur}
                                    />
                                    <FormHelperText>{direccionErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Direccion Laboral</InputLabel>
                                    <Input
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Home />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="direccionLaboral"
                                        inputVariant="outlined"
                                        value={direccionLaboral}
                                        error={direccionLaboralError}
                                        onChange={handleDireccionLaboralChange}
                                        onBlur={handleDireccionLaboralBlur}
                                    />
                                    <FormHelperText>{direccionLaboralErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        label="Fecha de nacimiento*"
                                        openTo="year"
                                        format="dd/MM/yyyy"
                                        value={fechaDeNacimiento}
                                        views={["year", "month", "date"]}
                                        onChange={setFechaDeNacimiento}
                                        disableFuture
                                        inputVariant="outlined"
                                    />
                                </MuiPickersUtilsProvider>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="genero">Género*</InputLabel>
                                    <Select
                                        labelId="genero"
                                        id="genero-pick"
                                        value={genero}
                                        name="genero"
                                        onChange={handleGeneroChange}
                                        label="Género*"
                                    >
                                        <MenuItem value={"M"}>Masculino</MenuItem>
                                        <MenuItem value={"F"}>Femenino</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </Grid>

                        <Grid container item xs={4} spacing={1}>
                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Correo</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AlternateEmail />
                                            </InputAdornment>
                                        }
                                        type="email"
                                        name="correo"
                                        variant="outlined"
                                        value={correoElectronico}
                                        error={correoElectronicoError}
                                        onChange={handleCorreoElectronicoChange}
                                        onBlur={handleCorreoElectronicoBlur}
                                    />
                                    <FormHelperText>{correoElectronicoErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Contraseña</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <VisibilityOff />
                                            </InputAdornment>
                                        }
                                        type="password"
                                        name="contrasena"
                                        variant="outlined"
                                        value={contrasena}
                                        error={contrasenaError}
                                        onChange={handleContrasenaChange}
                                        onBlur={handleContrasenaBlur}
                                    />
                                    <FormHelperText>{contrasenaErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Confirmar</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <VisibilityOff />
                                            </InputAdornment>
                                        }
                                        type="password"
                                        name="confirmar"
                                        variant="outlined"
                                        value={contrasenaConfirmada}
                                        error={contrasenaConfirmadaError}
                                        onChange={handleContrasenaConfirmadaChange}
                                        onBlur={handleContrasenaConfirmadaBlur}
                                    />
                                    <FormHelperText>{contrasenaConfirmadaErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl className={classes.margin} required>
                                    <InputLabel >Codigo Doctor</InputLabel>
                                    <Input

                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LocalHospital />
                                            </InputAdornment>
                                        }
                                        type="text"
                                        name="codigo"
                                        variant="outlined"
                                        value={codigoDoctor}
                                        error={codigoDoctorError}
                                        onChange={handleCodigoDoctorChange}
                                        onBlur={handleCodigoDoctorBlur}
                                    />
                                    <FormHelperText>{codigoDoctorErrorMensaje}</FormHelperText>
                                </FormControl>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="especialidad">Especialidad*</InputLabel>
                                    <Select
                                        labelId="especialidad"
                                        id="especialidad-pick"
                                        value={especialidad}
                                        name="especialidad"
                                        onChange={handleEspecialidadChange}
                                        label="Especialidad*"
                                    >
                                        {listaEsp.map((val) => (<MenuItem value={val.id}>{val.nombre}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </div>


                        </Grid>
                        <Grid container item xs={4} spacing={1}>


                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{ width: "250px" }}
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

                                <h3>{pathFoto.name}</h3>

                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{ width: "250px" }}
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

                                <h3>{pathCI.name}</h3>
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <Button
                                    style={{ width: "250px" }}
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

                                <h3>{pathTitulo.name}</h3>


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
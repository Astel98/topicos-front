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
    TextField, StepLabel, Step, Stepper
} from '@material-ui/core';
import React, { useState } from 'react'

import { useForm, useFormDoc } from '../../hooks/useForm';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
    AccountCircle,
    Event,
    VisibilityOff,
    AlternateEmail,
    AddIcCall,
    Home,
    LocalHospital
} from '@material-ui/icons';
import { fetchSinToken, fetchSinTokenDoc } from '../../common/fetcher';
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

    const {
        correo, contraseña, confirmar, laboral, especialidad,
        fecha_nac, codigo
    } = values;

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
                alertaSuccess('Usuario creado exitosamente')
            } else {
                alertaError('Error durante la creacion de usuario');
            }

        } catch (error) {
            console.log(error);
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let key in values) {
            if (values[key].toString().length <= 0) {
                alertaError(`${key} no debe estar vacio`);
                return;
            }
        }

        if (contraseña === confirmar) {
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

    return (

        <Container className={classes.divLogin} maxWidth="md" component={Paper}>

            <h2>Formulario Registro</h2>

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container spacing={1} alignContent="center" alignItems="center">
                    <Grid container xs={"auto"} item spacing={1}>

                        <Grid container item xs={4} spacing={1}>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Nombre(s)</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <AccountCircle />*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="nombre"*/}
                                {/*        value={nombre}*/}
                                {/*        error={nombre.length>0 ? false : true }*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={nombreError}
                                    helperText={nombreErrorMensaje}
                                    label="Nombre(s)*"
                                    variant="outlined"
                                    value={nombre}
                                    onChange={handleNombreChange}
                                    onBlur={handleNombreBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Apellido(s)</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <AccountCircle/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="apellido"*/}
                                {/*        value={apellido}*/}
                                {/*        error={apellido.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={apellidoError}
                                    helperText={apellidoErrorMensaje}
                                    label="Apellido(s)*"
                                    variant="outlined"
                                    value={apellido}
                                    onChange={handleApellidoChange}
                                    onBlur={handleApellidoBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Nro. Celular</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <AddIcCall/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="number"*/}
                                {/*        name="telefono"*/}
                                {/*        value={telefono}*/}
                                {/*        error={telefono.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={telefonoError}
                                    helperText={telefonoErrorMensaje}
                                    label="Teléfono*"
                                    variant="outlined"
                                    value={telefono}
                                    onChange={handleTelefonoChange}
                                    onBlur={handleTelefonoBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Nro. CI</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <AccountCircle/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="ci"*/}
                                {/*        value={ci}*/}
                                {/*        error={ci.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={ciError}
                                    helperText={ciErrorMensaje}
                                    label="Nro. CI*"
                                    variant="outlined"
                                    value={ci}
                                    onChange={handleCiChange}
                                    onBlur={handleCiBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Direccion</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <Home/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="direccion"*/}
                                {/*        value={direccion}*/}
                                {/*        error={direccion.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={direccionError}
                                    helperText={direccionErrorMensaje}
                                    label="Dirección*"
                                    variant="outlined"
                                    value={direccion}
                                    onChange={handleDireccionChange}
                                    onBlur={handleDireccionBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Direccion Laboral</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <Home/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="laboral"*/}
                                {/*        value={laboral}*/}
                                {/*        error={laboral.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={direccionLaboralError}
                                    helperText={direccionLaboralErrorMensaje}
                                    label="Dirección laboral*"
                                    variant="outlined"
                                    value={direccionLaboral}
                                    onChange={handleDireccionLaboralChange}
                                    onBlur={handleDireccionLaboralBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Fecha Nacimiento</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <Event/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="date"*/}
                                {/*        name="fecha_nac"*/}
                                {/*        value={fecha_nac}*/}
                                {/*        error={fecha_nac.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
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
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Correo</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <AlternateEmail/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="email"*/}
                                {/*        name="correo"*/}
                                {/*        value={correo}*/}
                                {/*        error={correo.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={correoElectronicoError}
                                    helperText={correoElectronicoErrorMensaje}
                                    label="Correo electrónico*"
                                    variant="outlined"
                                    value={correoElectronico}
                                    onChange={handleCorreoElectronicoChange}
                                    onBlur={handleCorreoElectronicoBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Contraseña</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <VisibilityOff/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="password"*/}
                                {/*        name="contraseña"*/}
                                {/*        value={contraseña}*/}
                                {/*        error={contraseña.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={contrasenaError}
                                    helperText={contrasenaErrorMensaje}
                                    label="Contraseña*"
                                    variant="outlined"
                                    value={contrasena}
                                    type="password"
                                    onChange={handleContrasenaChange}
                                    onBlur={handleContrasenaBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Confirmar</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <VisibilityOff/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="password"*/}
                                {/*        name="confirmar"*/}
                                {/*        value={confirmar}*/}
                                {/*        error={confirmar.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={contrasenaConfirmadaError}
                                    helperText={contrasenaConfirmadaErrorMensaje}
                                    label="Confirmar contraseña*"
                                    variant="outlined"
                                    value={contrasenaConfirmada}
                                    type="password"
                                    onChange={handleContrasenaConfirmadaChange}
                                    onBlur={handleContrasenaConfirmadaBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                {/*<FormControl className={classes.margin} onChange={handleInputChange} required>*/}
                                {/*    <InputLabel htmlFor="input-with-icon-adornment">Codigo Doctor</InputLabel>*/}
                                {/*    <Input*/}
                                {/*        id="input-with-icon-adornment"*/}
                                {/*        startAdornment={*/}
                                {/*            <InputAdornment position="start">*/}
                                {/*                <LocalHospital/>*/}
                                {/*            </InputAdornment>*/}
                                {/*        }*/}
                                {/*        type="text"*/}
                                {/*        name="codigo"*/}
                                {/*        value={codigo}*/}
                                {/*        error={codigo.length > 0 ? false : true}*/}
                                {/*    />*/}
                                {/*</FormControl>*/}
                                <TextField
                                    id="outlined-basic"
                                    error={codigoDoctorError}
                                    helperText={codigoDoctorErrorMensaje}
                                    label="Código doctor*"
                                    variant="outlined"
                                    value={codigoDoctor}
                                    onChange={handleCodigoDoctorChange}
                                    onBlur={handleCodigoDoctorBlur}
                                />
                            </div>

                            <div className="row" style={{ padding: "1rem" }}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="especialidad">Especialidad*</InputLabel>
                                    <Select
                                        labelId="especialidad"
                                        id="especialidad-pick"
                                        value={especialidad}
                                        name="especialidad"
                                        onChange={handleInputChange}
                                        label="Especialidad*"
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
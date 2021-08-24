import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { Button } from '@material-ui/core';
import { fetchSinToken, fetchConToken } from '../../common/fetcher';
import { useSelector } from 'react-redux';
import { calcularEdad } from '../../common/funciones';
import { alertaError, alertaRechazo, alertaSuccess } from '../../common/alertas';


const init =
{
    "solicitud": {
        "id": 1,
        "fecha_creacion": "2021-08-19T00:00:00Z",
        "fecha_actualizacion": "2021-08-19T00:00:00Z",
        "estado": "Pendiente",
        "motivo": null,
        "administrador_id": null,
        "doctor_id": 1
    },
    "persona": {
        "id": 1,
        "nombres": "Diego",
        "apellidos": "Choque",
        "telefono": 72615803,
        "ci": 12312,
        "correo_electronico_codigo": 70129,
        "telefono_codigo": 58118,
        "datos_verificados": true,
        "usuario_id": 1
    },
    "doctor": {
        "persona_id": 1,
        "direccion_laboral": "Barrio el Recreo",
        "fecha_nacimiento": "1996-06-17T00:00:00Z",
        "sexo": "M",
        "codigo_ss": "ASDW12",
        "ci_path": null,
        "titulo_path": null,
        "img_path": null,
        "especialidad_id": 1
    }
}

export const Lista = () => {

    const { name } = useSelector(state => state.auth)

    const [imagen, setImagen] = useState({});
    const [lista, setLista] = useState([])

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });

    const getLista = async () => {
        const res = await fetchConToken(`solicitudes`, name, '', 'GET')
        console.log(res)
        const resData = await res.json();

        setLista(resData);

        console.log(resData);

    }


    const getPerfil = async (id) => {
        const img = await fetchSinToken(`doctores/${id}/descargar_img`, '', 'GET')

        const imgData = await img.blob();

        // console.log(img);
        // console.log(imgData);

        return (URL.createObjectURL(imgData));

    }

    const handleButton = async (accion, id) => {

        switch (accion) {
            case 'aceptar':
                const userData1 = {
                    'id': Number(id),
                    'estado': 'Aceptada'
                }

                console.log(JSON.stringify(userData1))

                const resp1 = await fetchConToken('solicitudes/confirmar','', userData1, 'POST');

                console.log(resp1)

                if (resp1.ok) {
                    alertaSuccess("Solicitud Aceptada", "Solicitud de Doctor")
                } else {
                    console.log("AAAAAAAAAAa ERRORRRRR");
                }
                getLista();
                break;
            case 'rechazar':
                
                const userData2 = {
                    'id': Number(id),
                    'estado': 'Rechazada'
                }

                alertaRechazo(id)

                // console.log(JSON.stringify(userData2))

                // const resp2 = await fetchConToken(`solicitudes/confirmar`,'', userData2, 'POST');


                // console.log(resp2)

                // if (resp2.ok) {
                //     alertaError("Solicitud Rechazada", "Solicitud de Doctor")
                // } else {
                //     console.log("AAAAAAAAAAa ERRORRRRR");
                // }

                getLista();
                break;

            case 'getCI':
                const img = await fetchSinToken(`doctores/${id}/descargar_ci`, '', 'GET')

                const imgData = await img.blob();

                var url = window.URL.createObjectURL(imgData);
                var a = document.createElement('a');
                a.href = url;
                a.download = "filename";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();

            case 'getTitulo':
                const img2 = await fetchSinToken(`doctores/${id}/descargar_titulo`, '', 'GET')

                const imgData2 = await img2.blob();

                var url2 = window.URL.createObjectURL(imgData2);
                var a2 = document.createElement('a');
                a2.href = url2;
                a2.download = "filename";
                document.body.appendChild(a2); // we need to append the element to the dom -> otherwise it will not work in firefox
                a2.click();
                a2.remove();

            default:
                break;

        }

    }


    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root} >
                    <TableCell>
                        {/* <img src={() => (getPerfil(row.doctor.persona_id))} style={{ maxWidth: "100px", maxHeight: "100px" }} /> */}
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {(row.persona.nombres + " " + row.persona.apellidos)}
                    </TableCell>
                    <TableCell align="right">{row.persona.correo_electronico_codigo}</TableCell>
                    <TableCell align="right">{row.persona.telefono}</TableCell>
                    <TableCell align="right">{calcularEdad(row.doctor.fecha_nacimiento)}</TableCell>
                    <TableCell align="right">{row.persona.ci}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => handleButton('aceptar', row.solicitud.id)}
                            startIcon={<CheckIcon />}>
                            Aceptar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={() => handleButton('rechazar', row.solicitud.id)}
                            startIcon={<DeleteIcon />}
                        >
                            Rechazar
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Informacion Adicional
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Fecha Nacimiento</TableCell>
                                            <TableCell>Genero</TableCell>
                                            <TableCell>Direccion</TableCell>
                                            <TableCell>Especialidad</TableCell>
                                            <TableCell align="right">Documentos</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {row.history.map((historyRow) => ( */}
                                        <TableRow key={row.doctor.person}>
                                            <TableCell component="th" scope="row">
                                                {row.doctor.fecha_nacimiento}
                                            </TableCell>
                                            <TableCell>{row.doctor.sexo}</TableCell>
                                            <TableCell>{row.doctor.direccion_laboral}</TableCell>
                                            <TableCell>{row.doctor.especialidad_id}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => handleButton('getCI', row.persona.id)}
                                                >
                                                    CI
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => handleButton('getTitulo', row.persona.id)}
                                                >
                                                    Titulo
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        {/* ))} */}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    useEffect(() => {
        getLista();
        getPerfil(11);
    }, [])

    return (
        <TableContainer component={Paper} style={{ paddingTop: "100px" }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nombre y Apellido</TableCell>
                        <TableCell align="right">Correo</TableCell>
                        <TableCell align="right">Celular</TableCell>
                        <TableCell align="right">Edad</TableCell>
                        <TableCell align="right">CI</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map((val) => {
                        if (val.solicitud.estado === 'Pendiente') {
                            return (<Row key={val.doctor.persona_id} row={val} />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
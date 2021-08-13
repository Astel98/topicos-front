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


const init = {
    "id": 3,
    "estado": "Pendiente",
    "fecha_creacion": "2021-08-03T04:46:44.543082Z",
    "fecha_actualizacion": "2021-08-03T04:46:44.543105Z",
    "doctor": "a"
}

export const Reserva = () => {

    const { name } = useSelector(state => state.auth)

    const [imagen, setImagen] = useState({});
    const [lista, setLista] = useState([])


    const getLista = async () => {
        const res = await fetchConToken(`reservas`, name, '7', 'GET')
        console.log(res)
        const resData = await res.json();

        setLista(resData);

        console.log(resData);

    }


    const getPerfil = async (id) => {
        const img = await fetchSinToken(`doctores/${id}/descargar_img`, '', 'GET')

        const imgData = await img.blob();
        return (URL.createObjectURL(imgData));

    }

    const handleButton = async (accion, id) => {

        switch (accion) {
            case 'aceptar':
                const userData1 = {
                    'estado': 'Aceptada'
                }

                console.log(JSON.stringify(userData1))

                const resp1 = await fetchSinToken(`solicitudes/${id}/confirmar`, userData1, 'POST');

                console.log(resp1)

                if (resp1.ok) {
                    alert("Usuario Aceptado")
                } else {
                    console.log("AAAAAAAAAAa ERRORRRRR");
                }
                getLista();
                break;
            case 'rechazar':

                const userData2 = {
                    'estado': 'Rechazada'
                }

                console.log(JSON.stringify(userData2))

                const resp2 = await fetchSinToken(`solicitudes/${id}/confirmar`, userData2, 'POST');


                console.log(resp2)

                if (resp2.ok) {
                    alert("Usuario Rechazado")
                } else {
                    console.log("AAAAAAAAAAa ERRORRRRR");
                }

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
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {(row.doctor.nombres + " " + row.doctor.apellidos)}
                    </TableCell>
                    <TableCell align="right">{row.doctor.correo_electronico}</TableCell>
                    <TableCell align="right">{row.doctor.telefono}</TableCell>
                    <TableCell align="right">{calcularEdad(row.doctor.fecha_nacimiento)}</TableCell>
                    <TableCell align="right">{row.doctor.ci}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => handleButton('aceptar', row.id)}
                            startIcon={<CheckIcon />}>
                            Aceptar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={() => handleButton('rechazar', row.id)}
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
                                            <TableCell>Comentarios</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow key={row.doctor.person}>
                                            <TableCell component="th" scope="row">
                                                {row.doctor.fecha_nacimiento}
                                            </TableCell>
                                        </TableRow>
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
                        <TableCell align="right">Fecha Cita</TableCell>
                        <TableCell align="right">Hora Cita</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map((val) => {
                        if (val.estado === 'Pendiente') {
                            return (<Row key={val.doctor.persona} row={val} />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
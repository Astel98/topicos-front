import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { Button } from '@material-ui/core';
import { fetchSinToken, fetchConToken } from '../../common/fetcher';
import { useSelector } from 'react-redux';
import { alertaError } from '../../common/alertas';


const init = {
    "id": 3,
    "estado": "Pendiente",
    "fecha_creacion": "2021-08-03T04:46:44.543082Z",
    "fecha_actualizacion": "2021-08-03T04:46:44.543105Z",
    "doctor": "a"
}

export const Reserva = () => {

    const { name } = useSelector(state => state.auth)

    const [lista, setLista] = useState([])


    const getLista = async () => {
        const res = await fetchConToken(`reservas/doctor`, name, '', 'GET')
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
                    "id": id,
                    "estado": "Aceptada"
                }

                console.log(JSON.stringify(userData1))

                const resp1 = await fetchSinToken(`reservas/confirmar/`, userData1, 'POST');

                console.log(resp1)

                if (resp1.ok) {
                    alert("Usuario Aceptado")
                } else {
                    console.log("AAAAAAAAAAa ERRORRRRR");
                }
                getLista();
                break;
            case 'rechazar':

                // const userData2 = {
                //     'estado': 'Rechazada'
                // }

                // console.log(JSON.stringify(userData2))

                // const resp2 = await fetchSinToken(`solicitudes/${id}/confirmar`, userData2, 'POST');


                // console.log(resp2)

                // if (resp2.ok) {
                //     alert("Usuario Rechazado")
                // } else {
                //     console.log("AAAAAAAAAAa ERRORRRRR");
                // }

                // getLista();

                alertaError('NOT IMPLEMENTED')

                break;

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
                    
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.fecha_cita}</TableCell>
                    <TableCell align="right">{row.estado}</TableCell>
                    <TableCell align="right">{row.motivo}</TableCell>
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
                        <TableCell>Nombre Paciente</TableCell>
                        <TableCell align="right">Hora reserva</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell align="right">Motivo</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map((val) => {
                        if (val.estado === 'Pendiente') {
                            return (<Row key={val.id} row={val} />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
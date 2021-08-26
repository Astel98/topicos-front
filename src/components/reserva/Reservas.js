import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { Button, makeStyles } from '@material-ui/core';
import { fetchConToken } from '../../common/fetcher';
import { useSelector } from 'react-redux';
import { alertaError, alertaSuccess } from '../../common/alertas';


const init = [
    {
        "reserva": {
            "id": 2,
            "fecha_creacion": "2021-08-19T00:00:00Z",
            "fecha_actualizacion": "2021-08-19T00:00:00Z",
            "fecha_cita": "2021-08-21T00:00:00Z",
            "estado": "Aceptada",
            "motivo": null,
            "horario_doctor_id": 2,
            "paciente_id": 3
        },
        "persona": {
            "id": 3,
            "nombres": "Tomas",
            "apellidos": "Aguilar",
            "telefono": 72615803,
            "ci": 12312,
            "correo_electronico_codigo": 79792,
            "telefono_codigo": 44672,
            "datos_verificados": true,
            "usuario_id": 3
        },
        "paciente": {
            "persona_id": 3,
            "direccion_domicilio": "Barrio el Recreo",
            "fecha_nacimiento": "1996-06-17T00:00:00Z",
            "sexo": "M",
            "codigo_seguro": "",
            "tipo_seguro": "",
            "img_path": "./data/personas/3/0810c2a1-ff2c-4e31-8309-af613beb9ded.jpg"
        },
        "horario": {
            "id": 6,
            "dia": "Lunes",
            "hora_inicio": "0000-01-01T12:00:00Z",
            "hora_fin": "0000-01-01T13:00:00Z"
        }
    }]

export const Reservas = () => {

    const { name } = useSelector(state => state.auth)

    const [lista, setLista] = useState([])

    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });


    const getLista = async () => {
        const res = await fetchConToken(`reservas/doctor`, name, '', 'GET')
        console.log(res)
        const resData = await res.json();

        setLista(resData);

        console.log(resData);

    }


    const handleButton = async (accion, id) => {

        switch (accion) {
            case 'aceptar':
                const userData1 = {
                    "id": Number(id),
                    "estado": "Aceptada"
                }

                console.log(JSON.stringify(userData1))

                const resp1 = await fetchConToken('reservas/confirmar', '', userData1, 'POST');

                console.log(resp1)

                if (resp1.ok) {
                    alertaSuccess("Reserva Aceptada")
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

                    <TableCell align="right">{row.persona.nombres + " " + row.persona.apellidos}</TableCell>
                    <TableCell align="right">{row.horario.dia + " a hora " + row.horario.hora_inicio.substr(11, 8)}</TableCell>
                    <TableCell align="right">{row.horario.dia + " a hora " + row.horario.hora_fin.substr(11, 8)}</TableCell>
                    <TableCell align="right">{row.reserva.estado}</TableCell>
                    <TableCell align="right">
                        <Button variant="outlined"
                            color="primary"
                            className={classes.button}
                            onClick={() => handleButton('aceptar', row.reserva.id)}
                            startIcon={<CheckIcon />}>
                            Aceptar
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            onClick={() => handleButton('rechazar', row.reserva.id)}
                            startIcon={<DeleteIcon />}
                        >
                            Rechazar
                        </Button>
                    </TableCell>
                </TableRow>
                {/* <TableRow>
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
                </TableRow> */}
            </React.Fragment>
        );
    }

    useEffect(() => {
        getLista();
        // getPerfil(11);
    }, [])

    return (
        <TableContainer component={Paper} style={{ paddingTop: "100px" }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nombre Paciente</TableCell>
                        <TableCell align="right">Hora inicio reserva</TableCell>
                        <TableCell align="right">Hora fin reserva</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lista.map((val) => {
                        if (val.reserva.estado === 'Pendiente') {
                            return (<Row key={val.reserva.id} row={val} />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
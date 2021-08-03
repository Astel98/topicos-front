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
import { fetchSinToken } from '../../common/fetcher';


const init = {
    "id": 3,
    "estado": "Pendiente",
    "fecha_creacion": "2021-08-03T04:46:44.543082Z",
    "fecha_actualizacion": "2021-08-03T04:46:44.543105Z",
    "doctor": {
        "persona": 7,
        "direccion_laboral": "Calle Florida, N°12",
        "fecha_nacimiento": "1996-06-17",
        "sexo": "M",
        "codigo_ss": null,
        "ci_url": "/ci.jpg",
        "titulo_url": "/title.jpg",
        "img_url": "/img.jpeg",
        "especialidades": [
            {
                "id": 1,
                "nombre": "Cardiología",
                "descripcion": "Problemas del corazón."
            }
        ],
        "nombres": "Roberto",
        "apellidos": "Pérez",
        "telefono": 72615801,
        "ci": 779550,
        "correo_electronico": "roberto@gmail.com"
    },
    "administrador": null
}

export const Lista = () => {

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
        const res = await fetchSinToken(`solicitudes`, '', 'GET')

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
                const img = await fetchSinToken(`doctores/${id}/descargar_img`, '', 'GET')

                const imgData = await img.blob();

                var url = window.URL.createObjectURL(imgData);
            var a = document.createElement('a');
            a.href = url;
            a.download = "filename.xlsx";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();    
            a.remove();

            case 'getTitulo':

            default:
                break;

        }

    }

    const edad = (nacimiento) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(nacimiento)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
            diferenciaMeses < 0 ||
            (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
            edad--
        }
        return edad
    }

    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                { date: '2020-01-05', customerId: '11091700', amount: 3 }
            ],
        };
    }

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root} >
                    <TableCell>
                        <img src={() => (getPerfil(row.doctor.persona))} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {(row.doctor.nombres + " " + row.doctor.apellidos)}
                    </TableCell>
                    <TableCell align="right">{row.doctor.correo_electronico}</TableCell>
                    <TableCell align="right">{row.doctor.telefono}</TableCell>
                    <TableCell align="right">{edad(row.doctor.fecha_nacimiento)}</TableCell>
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
                                            <TableCell>{row.doctor.especialidades[0].nombre}</TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => handleButton('getCI', row.doctor.person)}
                                                >
                                                    CI
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    className={classes.button}
                                                    onClick={() => handleButton('getTitulo', row.doctor.person)}
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

    Row.propTypes = {
        row: PropTypes.shape({
            calories: PropTypes.string.isRequired,
            carbs: PropTypes.string.isRequired,
            fat: PropTypes.string.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            protein: PropTypes.number.isRequired,
        }).isRequired,
    };

    const rows = [
        createData('Jose Mario', 'mail@mail.com', '70611722', '1998/02/01', '65432', 3.99),
        createData('Jose Mario', 'mail@mail.com', '70611722', '1998/02/01', '65432', 3.99),
        createData('Jose Mario', 'mail@mail.com', '70611722', '1998/02/01', '65432', 3.99),
        createData('Jose Mario', 'mail@mail.com', '70611722', '1998/02/01', '65432', 3.99),
        createData('Jose Mario', 'mail@mail.com', '70611722', '1998/02/01', '65432', 3.99),
    ];

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
                        if (val.estado === 'Pendiente') {
                            return (<Row key={val.doctor.persona} row={val} />)
                        }
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
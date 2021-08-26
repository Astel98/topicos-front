import { Button, Table, TableContainer, TableHead, TableRow, TextField, Paper, TableCell, TableBody } from '@material-ui/core'
import React, { useState } from 'react'
import { alertaError, alertaFinMeet } from '../../common/alertas'

export const DetallesCita = ({ name, paciente, id_cita }) => {

    const { sexo, fecha_naciemiento, direccion_domicilio } = paciente

    const [medicamento, setMedicamento] = useState()
    const [cantidad, setCantidad] = useState()
    const [detalle, setDetalle] = useState()
    const [receta, setReceta] = useState([])

    const handleEnd = (e) => {

        alertaFinMeet(id_cita, receta)
    }

    const handlemedicamento = (event) => {
        setMedicamento(event.target.value);
    }
    const handlecantidad = (event) => {
        setCantidad(event.target.value);
    }
    const handledetalle = (event) => {
        setDetalle(event.target.value);
    }

    // const handleReceta = () => {
    //     alertaFinMeet(id_cita)
    // }

    // const handleAnalisis = () => {
    //     alertaFinMeet(id_cita)
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (medicamento != '' && cantidad != '' && detalle != '') {
            setReceta([
                ...receta,
                {
                    nombre: medicamento,
                    tipo: cantidad,
                    detalle: detalle
                }
            ])

            setMedicamento('')
            setCantidad('')
            setDetalle('')
        } else {
            alertaError('Primero rellene los campos')
        }

    }



    return (
        <>
            <div style={{textAlign: 'center'}}>
                <h2>Paciente: {name}</h2>
                <br />
                <span>
                    Genero: {sexo}
                </span>
                <br />
                <span>
                    Fecha Nacimiento: {fecha_naciemiento}
                </span>
                <br />
                <span>
                    Direccion: {direccion_domicilio}
                </span>
                <br />
            </div>

            <div>
                <form noValidate autoComplete="off">
                    <TextField id="filled-basic" onChange={handlemedicamento} name="" value={medicamento} label="Medicamento" variant="filled" />
                    <TextField id="filled-basic" onChange={handlecantidad} name="" value={cantidad} label="Cantidad" variant="filled" />
                    <TextField id="filled-basic" onChange={handledetalle} name="" value={detalle} label="Detalle" variant="filled" />
                    <Button size="small" color="secondary" onClick={handleSubmit} type="submit">
                        Añadir Medicamento
                    </Button>
                </form>
            </div>

            <TableContainer className="div-card" component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Medicamento</TableCell>
                            <TableCell align="right">Cantidad/Tipo</TableCell>
                            <TableCell align="right">Detalle</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receta.map((val) => {
                            return (
                                <TableRow >
                                    <TableCell>
                                        {val.nombre}
                                    </TableCell>
                                    <TableCell align="right">
                                        {val.tipo}
                                    </TableCell>
                                    <TableCell align="right">
                                        {val.detalle}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button size="small" color="secondary" onClick={handleEnd}>
                Finalizar Cita
            </Button>

        </>
    )
}

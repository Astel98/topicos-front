import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { fetchConToken } from '../../common/fetcher'
import { DetallesCita } from './DetallesCita'
import JitsiComponent from './JitsiComponent'

export const Cita = () => {

    const [meetPage, setMeet] = useState((<h2 className="meet-card">CARGANDO . . .</h2>))


    const location = useLocation()
    const { nombre, meet, paciente, id_cita } = location.state

    const createMeet = () => {
        const userData = localStorage.getItem('user-data')

        const dataStart = {
            "id": id_cita,
            "estado": "En curso"
        }
        fetchConToken('citas', '', dataStart, 'PUT').then((resp) => {
            if (resp.ok) {
                setMeet((
                    <JitsiComponent
                        room={meet ?? "no-definido"}
                        name={userData ?? "INVITADO"} />
                ))
            }
        })



    }

    useEffect(() => {
        createMeet()
    }, [])

    return (
        <div className="divMain">
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <Paper className="meet-card">
                        <DetallesCita paciente={paciente ?? { sexo: 'M', fecha_naciemiento: 'AAAA', direccion_domicilio: 'AAAA' }} name={nombre} id_cita={id_cita} />
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    {meetPage}
                </Grid>

            </Grid>
        </div>


    )
}
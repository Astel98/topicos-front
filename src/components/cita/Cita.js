import { Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { fetchSinToken } from '../../common/fetcher'
import { DetallesCita } from './DetallesCita'
import JitsiComponent from './JitsiComponent'

export const Cita = ({roomID}) => {

    const [meet, setMeet] = useState((<h2 className="meet-card">CARGANDO . . .</h2>))

    const createMeet = () => {
        const userID = localStorage.getItem('user-id')

        setMeet((
            <JitsiComponent 
                room={roomID ?? "b22bb193-ce20-4785-9d36-ea64fcfcf565"} 
                name="Jose Ramirez Pendeiviz" />
        ))
        
    }

    useEffect(() => {
        createMeet()
    }, [])

    return (
        <div className="divMain">
            <Grid container spacing={3}>
            <Grid item xs={4}>
                <Paper className="meet-card">
                    <DetallesCita />
                </Paper>
            </Grid>
            <Grid item xs={8}>
                {meet}
            </Grid>

        </Grid>
        </div>


    )
}
import { Button, Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { fetchSinToken } from '../../common/fetcher'

export const Perfil = () => {

    const [horario, setHorario] = useState((<div></div>))

    const buildData = () => {
        return (
            <div>
                <h2>Correo: jose@mail.com</h2>
                <h2>Especialidad: Urologo</h2>
                <h2>Direccion: Casa bonita</h2>
                <h2>Consultorio: Casa fea</h2>
            </div>
        )
    }

    const horarios = async () => {
        const arr = [1, 2, 3, 4, 5]

        const resp = await fetchSinToken(`doctores/7/horarios_registrados`, '', 'GET')
        const body = await resp.json()
        console.log(body)

        setHorario (
            <div>
                <Grid container spacing={2} className="">


                    {arr.map((val) => {
                        return (
                            <Grid item xs={12} className="">
                                {`${val} ${body.detail}`}
                            </Grid>)
                    })}

                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined" color="primary">Editar</Button>
                </Grid>
            </div>
        )
    }

    useEffect(() => {
        horarios()
    }, [])




    return (
        <div className="divMain">

            <Paper>
                <h2 style={{textAlign: 'center'}}>{localStorage.getItem('name') ?? 'JOSE JOSE'}</h2>
                <hr />

                <Grid container spacing={2} className="">

                    <Grid item xs={4}><img className="" src="/images/smol.jpeg" /></Grid>

                    <Grid item xs={4} className="">
                        <div>{buildData()}</div>
                    </Grid>
                    <Grid item xs={4} className="">
                        <strong>Horario de atencion</strong>
                        <hr/>
                        <div>{horario}</div>
                    </Grid>

                </Grid>
            </Paper>

        </div>
    )
}

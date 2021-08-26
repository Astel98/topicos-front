import { Button, Grid, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { fetchConToken, fetchSinToken } from '../../common/fetcher'

export const Perfil = () => {

    const [horario, setHorario] = useState((<div>Cargando . . .</div>))
    const [dataBuild, setDataBuild] = useState((<div>Cargando . . .</div>))
    // const [userData, setUserData] = useState()
    const [imagen, setImagen] = useState()
    let grupoID = localStorage.getItem('grupo-id');

    const userDataReq = async () => {

        fetchConToken('usuario', '', '', 'GET')
            .then((resp) => resp.json())
            .then(async (body) => {
                // setUserData(body)

                setDataBuild(
                    <div>
                        <h2>Nombre(s): {body.nombres}</h2>
                        <h2>Apellido(s): {body.apellidos}</h2>
                        <h2>Telefono: {body.telefono}</h2>
                        <h2>Nro CI: {body.ci}</h2>
                    </div>
                )



                const img = await fetchSinToken(`doctores/foto-perfil/${body.usuario_id}`, '', 'GET')
                console.log(img)
                if (img.ok) {
                    const imgData = await img.blob();
                    setImagen(URL.createObjectURL(imgData));
                }
            })
    }

    const horarios = async () => {

        const resp = await fetchConToken('horarios/doctor', '', '', 'GET')
        const body = await resp.json()

        console.log(body)

        if (grupoID === '2') {
            setHorario(
                <div>
                    <Grid container spacing={2} className="">
                        {body.map((val) => {
                            return (
                                <Grid item xs={12} className="">
                                    {`Dia: ${val.dia}`}
                                    <br />
                                    {`De: ${val.hora_inicio.substr(11, 8)}`}
                                    <br />
                                    {`Hasta: ${val.hora_fin.substr(11, 8)}`}
                                </Grid>)
                        })}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" color="primary">Editar Horario</Button>
                    </Grid>
                </div>
            )
        }
    }

    const userName = localStorage.getItem('user-data')

    useEffect(() => {
        userDataReq()
        horarios()
    }, [])




    return (

        <Paper className="div-perfil">
            <h1 style={{ textAlign: 'center' }}>{userName ?? 'JOSE JOSE'}</h1>
            <hr />

            <Grid container spacing={2} className="border-perfil">

                <Grid item className="border-elemento" xs={2}>
                    <img className="border-elemento" src={imagen ?? `/images/smol.jpeg`} style={{ width: "200px", height: "200px" }} />
                </Grid>

                <Grid item className="border-elemento" xs={4} className="">
                    <div>{dataBuild}</div>
                </Grid>
                <Grid item className="border-elemento" xs={6} className="">
                    <strong>Horario de atencion</strong>
                    <hr />
                    <div>{horario}</div>
                </Grid>

            </Grid>
        </Paper>

    )
}

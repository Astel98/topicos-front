import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useStyles } from '../../common/estilos';
import { messages } from '../../common/calendar-messages-es';
import { fetchConToken } from '../../common/fetcher'
import { Grid, Typography, Paper, Card, CardActionArea, CardContent, Button, CardMedia, CardActions } from '@material-ui/core'
import { Evento } from './Evento'
import { alertaSuccess } from '../../common/alertas'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

moment.locale('es-mx');
const localizer = momentLocalizer(moment)


export const Caledario = () => {

    const handleCancel = (id) => {
        const dataFin = {
            "id": id,
            "estado": "Cancelada"
        }
        fetchConToken('citas', '', dataFin, 'PUT').then((resp) => {
            if (resp.ok) {
                console.log(resp)
                alertaSuccess('Cita cancelada')
            }
        })
    }

    const onDoubleClick = (e) => {
        setEventCard(
            (
                <Card className="card-class">
                    <CardActionArea onClick={() => { alertaSuccess('Exito') }}>
                        <CardMedia
                            className="card-media"
                            image="/images/smol.jpeg"
                            title="Gato Chiquito"
                        />

                    </CardActionArea>
                    <CardContent className="card-body">
                        <Typography gutterBottom variant="h5" component="h2">
                            {e.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`Hora estimada de inicio: ${e.start}`}
                        </Typography>

                        <Typography variant="body2" color="textSecondary" component="p">
                            {`Hora estimada de fin: ${e.end}`}
                        </Typography>
                    </CardContent>
                    <CardActions className="card-footer">

                        {e.cita.estado === "Pendiente" ? <Link to={{
                            pathname: "/cita",
                            state: {
                                nombre: e.user.name + " " + e.user.lastName,
                                meet: e.user.meet,
                                id_cita: e.cita.id,
                                paciente: e.paciente
                            },
                        }}>
                            <Button size="small" color="primary">
                                Ingresar a la sala
                            </Button>
                        </Link> : <Button size="small" color="primary">
                            Cita concluida
                        </Button>}

                        <Button size="small" color="secondary" onClick={() => handleCancel(e.cita.id)}>
                            Cancelar
                        </Button>
                    </CardActions>
                </Card >
            )
        )
    }

    const [reservas, setReservas] = useState([])
    const [eventCard, setEventCard] = useState((<div>NOTHING TO DO</div>))
    const classes = useStyles();

    const getEventos = async () => {
        const resp = await fetchConToken('citas/doctor', '', 'GET')
        console.log(resp)
        const body = await resp.json();
        console.log(body)

        body.map((val) => {
            setReservas(
                [...reservas,
                {
                    title: `Cita con ${val.persona.nombres}`,
                    start: moment(`${val.cita.fecha_hora.substr(0, 11) + val.horario.hora_inicio.substr(11, 8)}`),
                    end: moment(`${val.cita.fecha_hora.substr(0, 11) + val.horario.hora_fin.substr(11, 8)}`),
                    bgcolor: 'pink',
                    cita: {
                        id: val.cita.id,
                        estado: val.cita.estado
                    },
                    paciente: val.paciente,
                    user: {
                        name: val.persona.nombres,
                        lastName: val.persona.apellidos,
                        meet: val.cita.enlace.split('/')[3]
                    }
                }]
            )
        })
    }

    useEffect(() => {
        getEventos()
    }, [])

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: 'blue',
            borderRadius: '2px',
            opacity: 0.9,
            display: 'block',
            color: 'white'
        }

        return { style }
    }

    return (
        <div className={classes.mainDiv}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className="calendar-screen">
                        <Calendar
                            localizer={localizer}
                            events={reservas}
                            startAccessor="start"
                            endAccessor="end"
                            messages={messages}
                            eventPropGetter={eventStyleGetter}
                            onDoubleClickEvent={onDoubleClick}
                            components={{
                                event: Evento
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={4} className="calendar-screen" >
                    <Paper className="calendar-screen">
                        {eventCard}
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}

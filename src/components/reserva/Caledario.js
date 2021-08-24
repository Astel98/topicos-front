import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useStyles } from '../../common/estilos';
import { messages } from '../../common/calendar-messages-es';
import { fetchSinToken } from '../../common/fetcher'
import { Grid, Typography, Paper, Card, CardActionArea, CardContent, Button, CardMedia, CardActions } from '@material-ui/core'
import { Evento } from './Evento'
import { alertaSuccess } from '../../common/alertas'

moment.locale('es-mx');
const localizer = momentLocalizer(moment)

const events = [
    {
        title: 'Cita con Cynthia',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: 'pink',
        user: {
            name: 'mario'
        }
    },
    {
        title: 'Cita con Dario',
        start: moment().add(15, 'minutes').toDate(),
        end: moment().add(3, 'hours').toDate(),
        bgcolor: 'pink',
        user: {
            name: 'jose'
        }
    },
    {
        title: 'Cita con Gerson',
        start: moment().add(2, 'days').toDate(),
        end: moment().add(3, 'hours').add(2, 'days').toDate(),
        bgcolor: 'pink',
        user: {
            name: 'lucas'
        }
    }
]

export const Caledario = () => {

    const onDoubleClick = (e) => {
        setEventCard(
            (
                <Card className="card-class">
                    <CardActionArea onClick={() =>{ alertaSuccess('Exito')}}>
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
                        <Button size="small" color="primary">
                            Ingresar a la sala
                        </Button>
                        <Button size="small" color="secondary">
                            Cancelar
                        </Button>
                    </CardActions>
                </Card>
            )
        )
    }

    const [reservas, setReservas] = useState([])
    const [eventCard, setEventCard] = useState((<div>NOTHING TO DO</div>))
    const classes = useStyles();

    const getEventos = async () => {
        const resp = await fetchSinToken(`reservas`, '', 'GET')
        console.log(resp)
        const body = await resp.json();

        setReservas(body)
    }

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
                            events={events}
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

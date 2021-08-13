import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import 'moment/locale/es-mx'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { useStyles } from '../../common/estilos';
import { messages } from '../../common/calendar-messages-es';
import { fetchSinToken } from '../../common/fetcher'

moment.locale('es-mx');
const localizer = momentLocalizer(moment)

const events = [
    {
        title: 'Cita con Cynthia',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: 'pink'
    },
    {
        title: 'Cita con Dario',
        start: moment().add(15, 'minutes').toDate(),
        end: moment().add(3, 'hours').toDate(),
        bgcolor: 'pink'
    },
    {
        title: 'Cita con Gerson',
        start: moment().add(2, 'days').toDate(),
        end: moment().add(3, 'hours').add(2, 'days').toDate(),
        bgcolor: 'pink'
    }
]

export const Caledario = () => {

    const [reservas, setReservas] = useState([])
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
        <div className={classes.calendarScreen}>

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
            />

        </div>
    )
}

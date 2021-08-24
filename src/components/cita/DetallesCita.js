import { Button, TextField } from '@material-ui/core'
import React from 'react'

export const DetallesCita = () => {
    return (
        <>
            <h2>NOMBER PACIENTE</h2>
            <br />
            <span>
                Detalles sobre el paciente y su historial
            </span>
            <br />
            <Button size="small" color="primary">
                Acceder Historial
            </Button>
            <br />
            <form noValidate autoComplete="off">
                <TextField type="text" label="Standard" />
            </form>
            <br />
            <Button size="small" color="secondary">
                Añadir Nota
            </Button>

        </>
    )
}

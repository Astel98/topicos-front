import React from 'react'

export const Evento = ({event}) => {

    const {title, user} = event

    return (
        <div>
            <span>{title}</span>      
            <br/>
            <strong>-{user.name}</strong>            
        </div>
    )
}

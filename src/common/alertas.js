import Swal from 'sweetalert2'
import { fetchConToken } from './fetcher';


export const alertaSuccess = (mensaje, titulo = "Exito") => {
    Swal.fire(titulo, mensaje, "success");
}

export const alertaError = (mensaje, titulo = "Error") => {
    Swal.fire(titulo, mensaje, "error");
}

export const alertaRechazo = (id) => {
    Swal.fire({
        title: 'Solcitud Doctor',
        text: 'Esta seguro que desea rechazar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (!result.isConfirmed) {
            Swal.fire(
                'Cancelado',
                'No se rechazo al Doctor',
                'success'
            )
        } else {
            Swal.fire({
                input: 'textarea',
                inputLabel: 'Motivo',
                inputPlaceholder: 'Ingrese el motivo del rechazo',
                inputAttributes: {
                    'aria-label': 'Ingrese el motivo del rechazo'
                },
                showCancelButton: true
            }).then(async (result) => {

                if (result.isConfirmed) {
                    const data = {
                        'id': Number(id),
                        'estado': 'Rechazada',
                        'motivo': result.value ?? "NINGUNO"
                    }

                    const resp2 = await fetchConToken('solicitudes/confirmar', '', data, 'POST');

                    console.log(resp2)

                    if (resp2.ok) {
                        alertaError("Solicitud Rechazada", "Solicitud de Doctor")
                    } else {
                        console.log("AAAAAAAAAAa ERRORRRRR");
                    }
                }
            })
        }
    })
}

export const alertaFinMeet = (id, medicamentos) => {
    Swal.fire({
        title: 'Esta por finalizar la cita',
        text: 'Esta seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                input: 'textarea',
                inputLabel: 'Motivo',
                inputPlaceholder: 'Ingrese el motivo de la cita',
                inputAttributes: {
                    'aria-label': 'Ingrese el motivo de la cita'
                },
                showCancelButton: true
            }).then((motivo) => {
                if (motivo.isConfirmed) {
                    Swal.fire({
                        input: 'textarea',
                        inputLabel: 'Detalle',
                        inputPlaceholder: 'Detalle del motivo',
                        inputAttributes: {
                            'aria-label': 'Detalle del motivo'
                        },
                        showCancelButton: true
                    }).then(async (detalle) => {
                        if (detalle.isConfirmed) {
                            const data = {
                                "motivo": motivo.value,
                                "descripcion": detalle.value,
                                "cita_id": id
                            }

                            const resp = await fetchConToken('historial', '', data, 'POST');

                            console.log(resp)

                            if (resp.ok) {
                                alertaSuccess("Historia añadida", "Historia clinica")
                                alertaReceta(id, medicamentos)
                            } else {
                                alertaError("Parece que hubo un error al crear la cita", "OOPS...")
                            }
                        }
                    })
                }
            })
        }
    })
}

export const alertaReceta = (id, medicamentos) => {
    Swal.fire({
        input: 'textarea',
        inputLabel: 'Detalle de receta',
        inputPlaceholder: 'Ingrese el motivo de la receta',
        inputAttributes: {
            'aria-label': 'Ingrese el motivo de la receta'
        },
        showCancelButton: true
    }).then(async (detalle) => {
        if (detalle.isConfirmed) {
            const data = {
                "receta": {
                    "detalle": detalle.value,
                    "cita_id": id
                },
                "medicamentos": medicamentos
            }

            const resp = await fetchConToken('recetas', '', data, 'POST');

            console.log(resp)

            if (resp.ok) {
                alertaSuccess("Receta añadida", "Receta clinica")

                const dataFin = {
                    "id": id,
                    "estado": "Finalizada"
                }
                fetchConToken('citas','',dataFin, 'PUT')

            } else {
                alertaError("Parece que hubo un error al crear la receta", "OOPS...")
            }
        }
    })
}
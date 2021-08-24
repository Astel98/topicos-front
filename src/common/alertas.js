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
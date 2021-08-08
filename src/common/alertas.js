import Swal from 'sweetalert2'


export const alertaSuccess = (mensaje, titulo="Exito") => {
    Swal.fire(titulo, mensaje, "success");
}

export const alertaError = (mensaje, titulo="Error") => {
    Swal.fire(titulo, mensaje, "error");
}
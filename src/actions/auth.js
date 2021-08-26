import { alertaError } from '../common/alertas'
import { fetchConToken, fetchSinToken } from '../common/fetcher'
import { types } from '../types/types'

export const startLoginEmailPassword = (email, contraseña) => {
    return async (dispatch) => {
        const data = {
            "correo_electronico": email,
            "contrasena": contraseña
        }

        fetchSinToken('iniciar-sesion', data, 'POST').then(
            (resp) => {
                if(resp.ok){
                    resp.json().then(
                        (data) => {
                            console.log(data)
                            localStorage.setItem('access-token', data.token);
                            localStorage.setItem('user-id', data.usuario_id);
                            localStorage.setItem('grupo-id', data.grupo_id);
                            localStorage.setItem('is-auth', true);
                            doctorDataReq()
                            dispatch(login(data.usuario_id, data.token, true))
                        }
                    )
                }else{
                    alertaError("Credenciales incorrectas");
                }
            }
        )

    }
}

export const doLogout = () => {
    return (dispatch) => {
        console.log('logour');
        localStorage.clear();
        dispatch(logout());
    }
}


export const login = (uid, displayName, loggued) => ({
    type: types.login,
    payload: {
        uid,
        displayName,
        loggued
    }
})

export const logout = () => ({
    type: types.logout
})

const doctorDataReq = async () => {
    const resp = await fetchConToken('usuario','','','GET')
    console.log(resp);
    resp.json().then((result) =>{
        console.log(result)
        localStorage.setItem('user-data', (result.nombres + " " + result.apellidos))
    })
    
}
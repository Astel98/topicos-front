import { fetchSinToken } from '../common/fetcher'
import { types } from '../types/types'

export const startLoginEmailPassword = (email, contraseña) => {
    return async (dispatch) => {
        const data = {
            "correo_electronico": email,
            "password": contraseña
        }

        fetchSinToken('iniciar-sesion', data, 'POST').then(
            (resp) => {
                if(resp.ok){
                    resp.json().then(
                        (data) => {
                            console.log(data)
                            dispatch(login(data.refresh, data.access, true))
                        }
                    )
                }else{
                    alert("Error al iniciar sesion, revise las credenciales")
                }
            }
        )

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

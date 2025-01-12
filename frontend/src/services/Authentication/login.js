import {LOGIN_URL} from '../../settings.js'

export function login({email, pass}){
    return fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: pass})
    })
    .then(res => {return res.json()})
    .then(data => {
        if(data.key){
            return data.key
        }
        else{
            if(data.password){
                throw new Error('Ingresa una contraseña válida')
            }
            else if(data.non_field_errors){
                throw new Error('Credenciales Incorrectas')
            }
            else{
                throw new Error('Error al iniciar sesión')
            }
        }
    })
    
}
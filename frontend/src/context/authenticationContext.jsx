import React, {useState, useEffect} from 'react';
import {login} from '../services/Authentication/login.js'
import { getUserProfile} from '../services/Authentication/userProfile.js';
import { changePassword } from '../services/Authentication/changePassword.js';
import {validatePassword} from '../utils/validatePassword.js'

export const AuthenticationContext = React.createContext({token:null, infoUser:null})

export function AuthenticationContextProvider({ children }) {
    const [auth, setAuth] = useState({token:null, infoUser:null})
    const [loading, setLoading] = useState(false)

    //check if user is already authenticated with token in localstorage
    useEffect(() => {
        let token = localStorage.getItem('token')
        setAuth((prev) => ({...prev, token:token}))
        if(token !== null){
            handleGetUserProfile(token)
        }
    },[])

    function handleLogin({email, pass, callback}){
        setLoading(true)
        login({email:email, pass:pass})
        .then(token => {
            localStorage.setItem('token', token)
            setAuth((prev) => ({...prev, token:token}))
            handleGetUserProfile(token)
            return callback('ok')
        })
        .catch(error => {
            return callback(error)
        })
        .finally(()=> setLoading(false))
    }

    function handleLogout(callback){
        localStorage.removeItem('token')
        setAuth((prev) => ({...prev, token:null, infoUser:null}))
        return callback()
    }

    function handleGetUserProfile(token){
        getUserProfile(token)
        .then(data => {
            setAuth((prev) => ({...prev, infoUser:data}))
        })
        .catch(error => {})
    }

    function handleChangePassword({newPassword1, newPassword2, token, callback}){
        let validation = validatePassword(newPassword2)
        if(validation == "ok" && newPassword1 == newPassword2){
            setLoading(true)
            changePassword({newPassword1:newPassword1, newPassword2:newPassword2, token:token})
            .then(res => {
                return callback('ok')
            })
            .catch(error => {
                return callback(error)
            })
            .finally(()=> setLoading(false))
        }
        else{
            if(newPassword1 != newPassword2){
                return callback("Las contraseñas no son iguales")
            }
            return callback(validation)
        }
    }

    return <AuthenticationContext.Provider value = {{auth, handleLogin, loading, handleLogout, handleChangePassword}}>
        {children}
    </AuthenticationContext.Provider>
}

export default AuthenticationContext
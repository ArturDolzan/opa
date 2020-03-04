import {SET_LOGGED, SET_AUTH} from '../reducers/authReducer'
import url from '../config/urlApi'
import axios from 'axios'

import {open} from '../actions/alertDialogBaseAction'

const alterarValorLogged = isLogged => ({
    type: SET_LOGGED,
    payload: isLogged
})

export const alterarAuth = auth => ({
    type: SET_AUTH,
    payload: auth
})


export const setValorIslogged = (isLogged) => (
   (dispatch, getState) => {
        
        dispatch(alterarValorLogged(isLogged))    
    }
)

export const setAuth = (auth) => (
    (dispatch, getState) => {
        
        axios.post(`${url}/signin`, {
            email: auth.email,
            password: auth.password
        })
        .then(function (response) {
        
            localStorage.setItem("token", `Bearer ${response.data.token}`)
            localStorage.setItem("email", response.data.email)
            localStorage.setItem("idtenant", response.data.idtenant)
            localStorage.setItem("name", response.data.name)
            localStorage.setItem("master", response.data.master)
            
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`

            dispatch(alterarAuth({
                isLogged: true,
                email: response.data.email,
                idtenant: response.data.idtenant,
                token: response.data.token,
                name: response.data.name,
                master: response.data.master
            }))
        })
        .catch(function (error) {

            dispatch(open({
                title: "Falha de login",
                text: "Não foi possível se autenticar"
            }))

        })    
     }
 )

 export const setLogout = () => (
    (dispatch, getState) => {
            
        localStorage.removeItem("token")
        localStorage.removeItem("email")
        localStorage.removeItem("idtenant")
        localStorage.removeItem("name")
        localStorage.removeItem("master")

        dispatch(alterarAuth({
            isLogged: false,
            email: '',
            idtenant: 0,
            token: '',
            name: '',
            master: false
        }))
       
     }
 )
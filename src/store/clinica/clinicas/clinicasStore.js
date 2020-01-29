import axios from 'axios'
import url from '../../../config/urlApi'
import Clinicas from '../../../model/clinica/clinicas/clinicas'

export const recuperar = (qtdePagina, numeroPagina, cbSucess, cbError) => {

    axios.get(`${url}/clinicas/${qtdePagina}/${numeroPagina}`)
     .then(cbSucess)
     .catch(cbError)
}

export const recuperarPorId = (id, cbSucess, cbError) => {

    axios.get(`${url}/clinicas/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvar = (data, cbSucess, cbError) => {

    axios.post(`${url}/clinicas`, data)
     .then(cbSucess)
     .catch(cbError)
}

export const remover = (id, cbSucess, cbError) => {

    axios.delete(`${url}/clinicas/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const inserirPrimeiraClinica = (Clinicas, cbSucess, cbError) => {

    axios.post(`${url}/clinicas`, Clinicas)
    .then(cbSucess)
    .catch(cbError)    
}

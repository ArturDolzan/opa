import axios from 'axios'
import url from '../../../config/urlApi'

export const recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

    axios.get(`${url}/agentes/${qtdePagina}/${numeroPagina}/${JSON.stringify(filters)}`)
     .then(cbSucess)
     .catch(cbError)
}

export const recuperarPorId = (id, cbSucess, cbError) => {

    axios.get(`${url}/agentes/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

export const salvar = (data, cbSucess, cbError) => {

    axios.post(`${url}/agentes`, data)
     .then(cbSucess)
     .catch(cbError)
}

export const remover = (id, cbSucess, cbError) => {

    axios.delete(`${url}/agentes/${id}`)
     .then(cbSucess)
     .catch(cbError)
}

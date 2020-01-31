import {recuperar, recuperarPorId, salvar, remover} from '../../../store/clinica/pacientes/pacientesStore'

class PacientesController {

    recuperar = (qtdePagina, numeroPagina, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, cbSucess, cbError)
    }

    recuperarPorId = (id, cbSucess, cbError) => {

        recuperarPorId(id, cbSucess, cbError)
    }

    salvar = (data, cbSucess, cbError) => {

        salvar(data, cbSucess, cbError)
    }

    remover = (id, cbSucess, cbError) => {

        remover(id, cbSucess, cbError)
    }
}

export default PacientesController
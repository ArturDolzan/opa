import {recuperar, recuperarPorId, salvar, remover} from '../../../store/configuracoes/convenios/conveniosStore'

class ConveniosController {

    recuperar = (qtdePagina, numeroPagina, filters, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, filters, cbSucess, cbError)
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

export default ConveniosController
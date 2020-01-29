import {recuperar, recuperarPorId, salvar, remover, inserirPrimeiraClinica} from '../../../store/clinica/clinicas/clinicasStore'
import Clinicas from '../../../model/clinica/clinicas/clinicas'

class ClinicasController {

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

    inserirPrimeiraClinica = (Clinicas, cbSucess, cbError) => {

        inserirPrimeiraClinica(Clinicas, cbSucess, cbError)
    }

}

export default ClinicasController
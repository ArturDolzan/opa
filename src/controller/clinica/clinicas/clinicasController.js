import {recuperar, inserirPrimeiraClinica} from '../../../store/clinica/clinicas/clinicasStore'
import Clinicas from '../../../model/clinica/clinicas/clinicas'

class ClinicasController {

    recuperar = (qtdePagina, numeroPagina, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, cbSucess, cbError)
    }

    inserirPrimeiraClinica = (Clinicas, cbSucess, cbError) => {

        inserirPrimeiraClinica(Clinicas, cbSucess, cbError)
    }

}

export default ClinicasController
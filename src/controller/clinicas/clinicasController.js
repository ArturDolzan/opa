import {recuperar, inserirPrimeiraClinica} from '../../store/clinicas/clinicasStore'
import Clinicas from '../../model/clinicas/clinicas'

class ClinicasController {

    recuperar = (qtdePagina, numeroPagina, cbSucess, cbError) => {

        recuperar(qtdePagina, numeroPagina, cbSucess, cbError)
    }

    inserirPrimeiraClinica = (Clinicas, cbSucess, cbError) => {

        inserirPrimeiraClinica(Clinicas, cbSucess, cbError)
    }

}

export default ClinicasController
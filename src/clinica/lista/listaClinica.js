import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Clinicas from '../../model/clinica/clinicas/clinicas'
import ClinicasController from '../../controller/clinica/clinicas/clinicasController'

const ListaClinica = (props) => {


    return (
        <Fragment>

            <ListaBase
                model={new Clinicas()}
                controller={new ClinicasController()}
                title={"Clínicas"}
            />

        </Fragment>
    )
}

export default ListaClinica
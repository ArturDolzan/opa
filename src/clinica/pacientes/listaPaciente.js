import React, {Fragment} from 'react'
import ListaBase from '../../base/crud/listaBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'

const ListaPaciente = (props) => {

    const columnsFormat = []

    return (
        <Fragment>

            <ListaBase
                model={new Pacientes()}
                controller={new PacientesController()}
                title={"Pacientes"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome, email, etc..."}
            />

        </Fragment>
    )
}

export default ListaPaciente
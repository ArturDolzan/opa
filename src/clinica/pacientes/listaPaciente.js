import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button'
import ListaBase from '../../base/crud/listaBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'

const ListaPaciente = (props) => {

    const columnsFormat = []
    const [selectedRow, setSelectedRow] = React.useState(null)

    const setarSelectedRow = (row) => {
        setSelectedRow(row)
    }

    const renderizarAcoes = () => {

        return (
            <Fragment>
                <Button size="small" variant="outlined" color="secondary" onClick={handleClickAnamnese}> 
                    Anamnese
                </Button>
            </Fragment>
        )
    }

    const handleClickAnamnese = () => {

        if (selectedRow) {
            props.history.push(`${props.match.url}/anamnese/${selectedRow.id}`)
        }        
    }

    return (
        <Fragment>

            <ListaBase
                model={new Pacientes()}
                controller={new PacientesController()}
                title={"Pacientes"}
                columnsFormat={columnsFormat}
                filterPlaceholder={"Filtrar por nome, email, etc..."}
                renderActions={renderizarAcoes()}
                selectedRow={setarSelectedRow}
            />

        </Fragment>
    )
}

export default ListaPaciente
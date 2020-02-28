import React, {Fragment} from 'react'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import ListaBase from '../../base/crud/listaBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'

const ListaPaciente = (props) => {

    const columnsFormat = []
    const [selectedRow, setSelectedRow] = React.useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        handleClickAnamnese()
    }

    const setarSelectedRow = (row) => {
        setSelectedRow(row)
    }

    const renderizarAcoes = () => {

        return (
            <Fragment>
              
                <Tooltip title="Mais opções" placement="right-end">
                    <IconButton style={{minWidth: "auto", marginLeft: "12px"}} 
                        aria-label="Atualizar" 
                        color="secondary" 
                        onClick={handleClick}>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>

                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Anamnese</MenuItem>
                </Menu>
            </Fragment>
        )
    }

    const handleClickAnamnese = () => {

        if (!selectedRow) {

            props.open({
                title: "Atenção",
                text: `Selecione um registro`
            })

            return
        }     
        
        props.history.push(`${props.match.url}/anamnese/${selectedRow.id}`)
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

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
    }
}

export default connect(null, mapDispatchToProps)(ListaPaciente)
import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'

import ClinicaDashboard from './clinicaDashboard/clinicaDashboard'

import ListaClinica from './lista/listaClinica'
import CadastroClinica from './cadastro/cadastroClinica'

import ListaPaciente from './pacientes/listaPaciente'
import CadastroPaciente from './pacientes/cadastroPaciente'
import AnamnesePaciente from './pacientes/anamnesePaciente'


const Clinica = ({match}) => {

    return (
        <Fragment>

            <Route exact path={`${match.url}/clinica`} component={ListaClinica}/>
            <Route exact path={`${match.url}/clinica/cadastro/:id`} component={CadastroClinica}/>

            <Route exact path={`${match.url}/paciente`} component={ListaPaciente}/>
            <Route exact path={`${match.url}/paciente/cadastro/:id`} component={CadastroPaciente}/>
            <Route exact path={`${match.url}/paciente/anamnese/:id`} component={AnamnesePaciente}/>

            <Route exact path={`${match.url}/`} component={ClinicaDashboard}/>
            
        </Fragment>
    )
}

export default Clinica
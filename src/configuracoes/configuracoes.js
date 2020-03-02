import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'

import ConfiguracoesDashboard from './configuracoesDashboard/configuracoesDashboard'

import ListaAgente from './agentes/listaAgente'
import CadastroAgente from './agentes/cadastroAgente'

import ListaConvenio from './convenios/listaConvenio'
import CadastroConvenio from './convenios/cadastroConvenio'

import ListaCargo from './cargos/listaCargo'
import CadastroCargo from './cargos/cadastroCargo'


const Configuracoes = ({match}) => {

    return (
        <Fragment>

            <Route exact path={`${match.url}/agente`} component={ListaAgente}/>
            <Route exact path={`${match.url}/agente/cadastro/:id`} component={CadastroAgente}/>

            <Route exact path={`${match.url}/convenio`} component={ListaConvenio}/>
            <Route exact path={`${match.url}/convenio/cadastro/:id`} component={CadastroConvenio}/>

            <Route exact path={`${match.url}/cargo`} component={ListaCargo}/>
            <Route exact path={`${match.url}/cargo/cadastro/:id`} component={CadastroCargo}/>

            <Route exact path={`${match.url}/`} component={ConfiguracoesDashboard}/>
            
        </Fragment>
    )
}

export default Configuracoes
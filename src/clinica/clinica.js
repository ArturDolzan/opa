import React, {Fragment} from 'react'
import {Route, Redirect} from 'react-router-dom'

import ClinicaDashboard from './clinicaDashboard/clinicaDashboard'


const Clinica = ({match}) => {

    return (
        <Fragment>
                
            <Route exact path={`${match.url}/`} component={ClinicaDashboard}/>
            
        </Fragment>
    )
}

export default Clinica
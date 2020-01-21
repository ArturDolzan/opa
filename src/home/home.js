import React, {Fragment, useEffect} from 'react'

import { connect } from "react-redux"
import {openDialogForm} from '../actions/formDialogBaseAction'
import {open} from '../actions/alertDialogBaseAction'
import LaunchDialog from './launchDialog/launchDialog'
import ClinicasController from '../controller/clinicas/clinicasController'
  

const Home = (props) => {

    useEffect(() => {

        checkFirstClinic()

        return () => {
            
        }        
    }, [])

    const checkFirstClinic = () => {

        let clinicasController = new ClinicasController()
        clinicasController.recuperar(1, 1, (ret) => {

            if (ret.data.data.length === 0) {
                renderLaunchClinicDialog()
            }

        }, (error) => {

            props.open({
                title: "Ops",
                text: `Não foi possível ler a clínica. \n Erro: ${error.response.statusText}`
            })
        })
    }

    const renderLaunchClinicDialogContent = () => {

        return (
            <Fragment>

                <LaunchDialog/>
            </Fragment>
        )
    }

    const renderLaunchClinicDialog = () => {

        props.openDialogForm({
            title: "Olá",
            content: renderLaunchClinicDialogContent(),
            actions: null,
            maxWidth: 'md',
            minHeight: '400px'
        })
    }

    return (
        <Fragment>
            
            HOME

        </Fragment>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        openDialogForm: (data) => { dispatch(openDialogForm(data)) },
        open: (data) => { dispatch(open(data)) }
    }
}

export default connect(null, mapDispatchToProps)(Home)
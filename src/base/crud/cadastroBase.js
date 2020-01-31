import React, {Fragment, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import ButtonSave from '../../base/buttonSave'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import {openConfirmation} from '../../actions/confirmationDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'


const useStyles = makeStyles(theme => ({       
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    backButton: {
        marginLeft: theme.spacing(2),
    },
    removeButton: {
        marginLeft: "auto"
    },
    paperHeader:{
        display: "flex",
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(2),
    },
    divPaperHeaderGrid: {
        minHeight: "75px", 
        display: "flex", 
        alignItems: "center"
    },
    paper:{
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)"
    }
}))


const CadastroBase = props => {

    const {
        touched,
        values,
        errors,
        dirty,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
        handleChange,
        setFieldValue,
        initialValues,
        setSubmitting,
        match,
    } = props

    const classes = useStyles()

    useEffect(() => {

        recuperarInitialValues()

        return () => {
            
        }        
    }, [])

    const recuperarInitialValues = () => {

        let id = match.params.id

        if (id == 0) {
            initialValues.id = 0
            props.setRetrieve(true)
            return true
        }

        let data = props.controller.recuperarPorId(id, (ret) => {

            Object.assign(initialValues, ret.data)

            props.setRetrieve(true)

        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar o registro ${id}. \n Erro: ${error}`
            })
        })
    }

    const handleSave = () => {

        setSubmitting(true)

        let data = props.controller.salvar({...values}, (ret) => {

            props.openSnackBase("Registro salvo com sucesso!")
            props.history.goBack()

            setSubmitting(false)
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível salvar o registro ${values.id}. \n Erro: ${error}`
            })

            setSubmitting(false)
        })
    }

    const handleRemove = () => {

        props.openConfirmation({
            title: "Remover",
            text: `Deseja remover este registro?`,
            data: {...values},
            cbYes: (value) => {
                
                let data = props.controller.remover(value.id, (ret) => {

                    props.openSnackBase("Registro removido com sucesso!")
                    props.history.goBack()

                }, (error) => {
                    
                    props.open({
                        title: "Ops",
                        text: `Não foi possível remover o registro ${values.id}. \n Erro: ${error}`
                    })
                })
            }
        })
    }

  return (
    <Fragment> 

        <Paper className={classes.paperHeader}>
            <div className={classes.divPaperHeaderGrid}>
                <Tooltip title="Voltar" placement="right-end">
                    <IconButton className={classes.backButton} aria-label="Atualizar" color="primary" onClick={() => props.history.goBack()}>
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h6">
                    {props.title}
                </Typography>
            </div>
        </Paper>
        
        <Paper className={classes.paper}>

            {props.retrieve && (

                <Fragment>
                    {props.renderForm}
                </Fragment>
            )}

            <div className={classes.buttonContainer}>
                <ButtonSave clickSave={handleSave} loading={isSubmitting} success={false} disabled={((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object)}/>                                
                
                <Tooltip title="Remover" placement="right-end">
                    <span>
                        <IconButton onClick={handleRemove} disabled={(values.id === 0)} aria-label="Remover" color="secondary" >
                            <DeleteIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </div>

        </Paper>
         
    </Fragment>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
        openConfirmation: (data) => { dispatch(openConfirmation(data)) },
        openSnackBase: (text) => { dispatch(openSnackBase(text)) }
    }
}

CadastroBase.propTypes = {
    controller: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    renderForm: PropTypes.any.isRequired,
    retrieve: PropTypes.any.isRequired,
    setRetrieve: PropTypes.any.isRequired,
}

export default withRouter(connect(null, mapDispatchToProps)(CadastroBase))
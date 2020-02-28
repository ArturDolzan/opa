import React, {Fragment, useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextInputBase from '../../base/input/textInputBase'
import AnamnesesController from '../../controller/clinica/anamneses/anamnesesController'
import Anamneses from '../../model/clinica/anamneses/anamneses'
import ButtonSave from '../../base/buttonSave'
import { withFormik } from 'formik'

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'


const formikEnhancer = withFormik({
    
	mapPropsToValues: () => {

		 let obj = {}
		 new Anamneses().fields.map(x => x.id).map( (item, idx) => {
			  
			  obj[item] = null

			  return obj
		 })

		 return obj
	},
 
	handleSubmit: (payload, { setSubmitting }) => {
	  
	  setSubmitting(false)  
	},

	enableReinitialize: true,
 })


const useStyles = makeStyles(theme => ({  
    root: {
        flexGrow: 1,
    },
    divRoot: {
		display: "flex",
	},
    backButton: {
        marginLeft: theme.spacing(2),
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
    },
    container: {
	  padding: theme.spacing(3),	  
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },	
}))

const AnamnesePaciente = (props) => {

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
        history,
    } = props

    const classes = useStyles()
    const [retrieve, setRetrieve] = useState(false)

    useEffect(() => {

        recuperarInitialValues()

        return () => {
            
        }        
    }, [])

    const recuperarInitialValues = () => {

        let idPaciente = match.params.id

        let controller = new AnamnesesController()

        let data = controller.recuperarPorIdDoPaciente(idPaciente, (ret) => {
            
            Object.assign(initialValues, ret.data)

            setRetrieve(true)
            
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar o registro ${idPaciente}. \n Erro: ${error}`
            })
        })
    }

    const handleSave = () => {

        setSubmitting(true)    

        let controller = new AnamnesesController()

        values.idpaciente = match.params.id

        let data = controller.salvar({...values}, (ret) => {
            
            props.openSnackBase("Registro salvo com sucesso!")
            props.history.goBack()
  
        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível salvar o registro ${values.id}. \n Erro: ${error}`
            })

            setSubmitting(false)
        })
    }

    const disableSaveButton = () => {
        return ((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object)
    }

    return (
        <Fragment>

            {retrieve && (
                <div className={classes.root}>
            
                    <Paper className={classes.paperHeader}>
                        <div className={classes.divPaperHeaderGrid}>
                            <Tooltip title="Voltar" placement="right-end">
                                <IconButton className={classes.backButton} aria-label="Atualizar" color="primary" onClick={() => history.goBack()}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">
                                Anamnese
                            </Typography>
                        </div>
                    </Paper>

                    <form onSubmit={handleSubmit} >

                        <Paper className={classes.paper}>

                            <div className={classes.divRoot}>
                                
                                <Grid container spacing={2} className={classes.container}>
                                    <Grid item md={7}>     
                                        <TextInputBase
                                            id="qp"
                                            label="Queixa principal"
                                            placeholder="Queixa principal"
                                            error={touched.qp && errors.qp}
                                            value={values.qp || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={8}
                                        />

                                    </Grid>

                                    <Grid item md={7}>     
                                        <TextInputBase
                                            id="hda"
                                            label="História de doença atual"
                                            placeholder="História de doença atual"
                                            error={touched.hda && errors.hda}
                                            value={values.hda || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={8}
                                        />

                                    </Grid>

                                    <Grid item md={7}>     
                                        <TextInputBase
                                            id="ap"
                                            label="Antecedentes patológicos"
                                            placeholder="Antecedentes patológicos"
                                            error={touched.ap && errors.ap}
                                            value={values.ap || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={8}
                                        />

                                    </Grid>

                                    <Grid item md={7}>     
                                        <TextInputBase
                                            id="af"
                                            label="Antecedentes familiares"
                                            placeholder="Antecedentes familiares"
                                            error={touched.af && errors.af}
                                            value={values.af || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={8}
                                        />

                                    </Grid>

                                    <Grid item md={7}>     
                                        <TextInputBase
                                            id="hv"
                                            label="Hábitos de vida"
                                            placeholder="Hábitos de vida"
                                            error={touched.av && errors.av}
                                            value={values.av || ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            multiline={true}
                                            rows={4}
                                            rowsMax={8}
                                        />

                                    </Grid>
                                </Grid>

                            </div>

                            <div className={classes.buttonContainer}>
                                <ButtonSave clickSave={handleSave} loading={isSubmitting} success={false} disabled={ disableSaveButton()}/>                                                           
                            </div>

                        </Paper>

                    </form>

                </div>
            )}

        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
        openSnackBase: (text) => { dispatch(openSnackBase(text)) },
    }
}

const CadAnamnesePaciente = formikEnhancer(AnamnesePaciente)

export default withRouter(connect(null, mapDispatchToProps)(CadAnamnesePaciente))
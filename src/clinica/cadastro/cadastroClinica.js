import React, {Fragment, useEffect} from 'react'
import TextInputBase from '../../base/input/textInputBase'
import ButtonSave from '../../base/buttonSave'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import DeleteIcon from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Clinicas from '../../model/clinica/clinicas/clinicas'
import ClinicasController from '../../controller/clinica/clinicas/clinicasController'

import InputMask from "react-input-mask"

import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'
import {openConfirmation} from '../../actions/confirmationDialogBaseAction'
import {openSnackBase} from '../../actions/snackBaseAction'


const useStyles = makeStyles(theme => ({   
    root: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
      },
    container: {
      paddingTop: theme.spacing(3),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    backButton: {
        marginBottom: theme.spacing(2),
    },
    removeButton: {
        marginLeft: "auto"
    },
}))

const formikEnhancer = withFormik({
    
    validationSchema: Yup.object().shape({    
      nome: Yup.string()
        .required('O campo nome é obrigatório!'),
      email: Yup.string()
        .required('O campo e-mail é obrigatório!')
        .email('Formato de e-mail não é válido!'),
    }),
  
    mapPropsToValues: () => {

        let obj = {}
        new Clinicas().fields.map(x => x.id).map( (item, idx) => {
            
            obj[item] = null

            return obj
        })

        return obj
    },
  
    handleSubmit: (payload, { setSubmitting }) => {
      //alert(payload.email)
      setSubmitting(false)
  
    },

    enableReinitialize: true,
  
    displayName: 'Formulário',
  })

const CadastroClinicaForm = props => {

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

    const [retrieve, setRetrieve] = React.useState(false)

    useEffect(() => {

        recuperarInitialValues()

        return () => {
            
        }        
    }, [])

    const recuperarInitialValues = () => {

        let id = match.params.id

        if (id == 0) {
            initialValues.id = 0
            setRetrieve(true)
            return true
        }

        let clinicasController = new ClinicasController()
        let data = clinicasController.recuperarPorId(id, (ret) => {

            Object.assign(initialValues, ret.data)

            setRetrieve(true)

        }, (error) => {
            
            props.open({
                title: "Ops",
                text: `Não foi possível recuperar clinica ${id}. \n Erro: ${error}`
            })
        })
    }

    const handleSave = () => {

        setSubmitting(true)

        let clinicasController = new ClinicasController()
        let data = clinicasController.salvar({...values}, (ret) => {

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
                
                let clinicasController = new ClinicasController()
                let data = clinicasController.remover(value.id, (ret) => {

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

        <form className={classes.root} onSubmit={handleSubmit}>

            <Tooltip title="Voltar" placement="right-end">
                <IconButton className={classes.backButton} aria-label="Atualizar" color="primary" onClick={() => props.history.goBack()}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>
            
            <Paper >

                {retrieve && (

                    <Grid container spacing={2} className={classes.container}>

                    <Grid item md={6}>     
                        <TextInputBase
                            id="nome"
                            label="Nome da Clínica"
                            placeholder="Nome da Clínica"
                            error={touched.nome && errors.nome}
                            value={values.nome || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                        />

                    </Grid>
                    <Grid item md={6} >     
                        <TextInputBase
                            id="email"
                            label="E-mail"
                            placeholder="E-mail"
                            error={touched.email && errors.email}
                            value={values.email || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                        />

                    </Grid>

                    <Grid item md={3}>     
                        <InputMask mask="(99) 99999-9999" value={values.fone || ""} onChange={handleChange} onBlur={handleBlur}>
                            {(inputProps) => <TextInputBase id="fone" label="Telefone" placeholder="Telefone" error={touched.fone && errors.fone} {...inputProps}  />}
                        </InputMask>
                    </Grid>
                    
                    <Grid item md={3}>     
                        <InputMask mask="99.999.999/9999-99" value={values.cnpj || ""} onChange={handleChange} onBlur={handleBlur}>
                            {(inputProps) => <TextInputBase id="cnpj" label="CNPJ" placeholder="CNPJ" error={touched.cnpj && errors.cnpj} {...inputProps}  />}
                        </InputMask>
                    </Grid>

                    <Grid item md={6} >     
                        <TextInputBase
                            id="razao_social"
                            label="Razão Social"
                            placeholder="Razão Social"
                            error={touched.razao_social && errors.razao_social}
                            value={values.razao_social || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                    </Grid>

                    <Grid item md={6} >     
                        <TextInputBase
                            id="endereco"
                            label="Endereço"
                            placeholder="Endereço"
                            error={touched.endereco && errors.endereco}
                            value={values.endereco || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                        />

                    </Grid>

                    <Grid item md={3}>     
                        <InputMask mask="99.999-999" value={values.cep || ""} onChange={handleChange} onBlur={handleBlur}>
                            {(inputProps) => <TextInputBase id="cep" label="CEP" placeholder="CEP" error={touched.cep && errors.cep} {...inputProps}  />}
                        </InputMask>
                    </Grid>

                </Grid>

                )}

                <div className={classes.buttonContainer}>
                    <ButtonSave clickSave={handleSave} loading={isSubmitting} success={false} disabled={((Object.keys(errors).length !== 0 || !dirty) && errors.constructor === Object)}/>                                
                    
                    <Tooltip title="Remover" placement="right-end">
                        <IconButton onClick={handleRemove} disabled={(values.id === 0)} aria-label="Remover" color="secondary" >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>

            </Paper>
        </form>
        
         
    </Fragment>
  )
}

const CadastroClinica = formikEnhancer(CadastroClinicaForm)

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) },
        openConfirmation: (data) => { dispatch(openConfirmation(data)) },
        openSnackBase: (text) => { dispatch(openSnackBase(text)) }
    }
}

export default connect(null, mapDispatchToProps)(CadastroClinica)
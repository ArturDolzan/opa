﻿import React, {Fragment} from 'react'
import ptBR from "date-fns/locale/pt-BR"
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import Grid from '@material-ui/core/Grid'
import InputMask from "react-input-mask"
import { makeStyles } from '@material-ui/core/styles'

import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers'
import 'date-fns'

import CadastroBase from '../../base/crud/cadastroBase'
import Pacientes from '../../model/clinica/pacientes/pacientes'
import PacientesController from '../../controller/clinica/pacientes/pacientesController'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  nome: Yup.string()
		 .required('O campo nome é obrigatório!')
		 .nullable(),
	  email: Yup.string()
		 .required('O campo e-mail é obrigatório!')
		 .email('Formato de e-mail não é válido!')
		 .nullable(),
	  sexo: Yup.string()
		 .required('O campo Sexo é obrigatório!')
		 .nullable(),
	  data_nascimento: Yup.date('Formato de data não é válido!')
		 .nullable(),
	}),
 
	mapPropsToValues: () => {

		 let obj = {}
		 new Pacientes().fields.map(x => x.id).map( (item, idx) => {
			  
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
	container: {
	  padding: theme.spacing(3),	  
	},	
}))


const CadastroPacienteForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)

  return (
    <Fragment> 

			<form onSubmit={handleSubmit} >

				<CadastroBase
					{...props}
					controller={new PacientesController()}
					title={"Paciente"}
					retrieve={retrieve}
					setRetrieve={setRetrieve}
					renderForm={renderForm(props, classes, retrieve)}
				/>      

			</form>   
	 </Fragment>	
  )
}

const renderForm = (props, classes, retrieve) => {

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
		error,
  } = props

	return (

		<Fragment>

			{retrieve && (

				<Grid container spacing={2} className={classes.container}>

					<Grid item md={6}>     
						<TextInputBase
							id="nome"
							label="Nome"
							placeholder="Nome"
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
						<InputMask mask="999.999.999-99" value={values.cpf || ""} onChange={handleChange} onBlur={handleBlur}>
							{(inputProps) => <TextInputBase id="cpf" label="CPF" placeholder="CPF" error={touched.cpf && errors.cpf} {...inputProps}  />}
						</InputMask>
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
						/>

					</Grid>

					<Grid item md={6} >
						<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
							<DatePicker
								disableToolbar
								variant="outlined"
								format="dd/MM/yyyy"
								margin="normal"
								id="data_nascimento"
								label="Data nascimento"
								value={values.data_nascimento}
								error={touched.data_nascimento && errors.data_nascimento}
								helperText={error}
								onChange={(_, dateString) => {
									setFieldValue('data_nascimento', dateString)
								}}								
							/>
						</MuiPickersUtilsProvider>
					</Grid>

				</Grid>
			
			)}
		</Fragment>
	)

}

const CadastroPaciente = formikEnhancer(CadastroPacienteForm)

export default CadastroPaciente
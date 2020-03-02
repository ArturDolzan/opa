import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import TextInputBase from '../../base/input/textInputBase'
import DateInputBase from '../../base/input/dateInputBase'
import SelectInputBase from '../../base/input/selectInputBase'
import Grid from '@material-ui/core/Grid'
import InputMask from "react-input-mask"
import { makeStyles } from '@material-ui/core/styles'
import AutoComplete from '../../base/autoComplete'

import CadastroBase from '../../base/crud/cadastroBase'
import Agentes from '../../model/configuracoes/agentes/agentes'
import AgentesController from '../../controller/configuracoes/agentes/agentesController'
import CargosController from '../../controller/configuracoes/cargos/cargosController'
import ImageAvatarEditBase from '../../base/imageAvatarEditBase'


const formikEnhancer = withFormik({
    
	validationSchema: Yup.object().shape({    
	  nome: Yup.string()
		 .required('O campo nome é obrigatório!')
		 .nullable(),
	  email: Yup.string()
		 .required('O campo e-mail é obrigatório!')
		 .email('Formato de e-mail não é válido!')
		 .nullable()
	}),
 
	mapPropsToValues: () => {

		 let obj = {}
		 new Agentes().fields.map(x => x.id).map( (item, idx) => {
			  
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
	containerPhoto: {
		padding: theme.spacing(1),
		marginLeft: theme.spacing(1.5),
		marginTop: theme.spacing(1),
		flex: 0.5
	},	
	divRoot: {
		display: "flex",
	}
}))


const CadastroAgenteForm = props => {
	
	const {handleSubmit} = props
	const classes = useStyles()	
	const [retrieve, setRetrieve] = React.useState(false)
	const [urlImage, setUrlImage] = React.useState(null)

  return (
    <Fragment> 

		<form onSubmit={handleSubmit} >

			<CadastroBase
				{...props}
				controller={new AgentesController()}
				title={"Usuário"}
				retrieve={retrieve}
				setRetrieve={setRetrieve}
				urlImage={urlImage}
				renderForm={renderForm(props, classes, retrieve, setUrlImage)}
			/>      

		</form>   
	 </Fragment>	
  )
}

const renderForm = (props, classes, retrieve, setUrlImage) => {

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

  	const handleImageChange = event => {
		setUrlImage(event)
    }
    
    const isNew = () => {

        return values.id ? false : true
    }

	return (

		<Fragment>
			
			{retrieve && (                
				<div className={classes.divRoot}>
                
					{/* <Grid container spacing={2} className={classes.containerPhoto}>
						<Grid item sm={12}>     
							<ImageAvatarEditBase id={values.id} isBig={true} controller={new PacientesController()} changeImage={handleImageChange}/>
						</Grid>
					</Grid> */}

					<Grid container spacing={2} className={classes.container}>

						<Grid item sm={6}>     
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
						<Grid item sm={6} >     
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

						<Grid item sm={4}>     
							<InputMask mask="(99) 99999-9999" value={values.fone || ""} onChange={handleChange} onBlur={handleBlur}>
								{(inputProps) => <TextInputBase id="fone" label="Telefone" placeholder="Telefone" error={touched.fone && errors.fone} {...inputProps}  />}
							</InputMask>
						</Grid>

						<Grid item sm={4}>     
							<InputMask mask="999.999.999-99" value={values.cpf || ""} onChange={handleChange} onBlur={handleBlur}>
								{(inputProps) => <TextInputBase id="cpf" label="CPF" placeholder="CPF" error={touched.cpf && errors.cpf} {...inputProps}  />}
							</InputMask>
						</Grid>

                        <Grid item sm={4}>     
                            <AutoComplete
                                id="idcargo"
                                label="Cargo"
                                url={new CargosController()}
                                chave="id"
                                valor="descricao"
                                defaultChave={values.idcargo}
                                defaultValor={"teste"}
                            />
						</Grid>

                        {isNew() && (
                            <Fragment>
                                <Grid item sm={6} >
                                    <TextInputBase
                                        id="password"
                                        label="Senha"
                                        placeholder="Senha"
                                        error={touched.password && errors.password}
                                        value={values.password || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        type={"password"}
                                    />
                                </Grid>

                                <Grid item sm={6} >
                                    <TextInputBase
                                        id="confirm_password"
                                        label="Confirmar senha"
                                        placeholder="Confirmar senha"
                                        error={touched.confirm_password && errors.confirm_password}
                                        value={values.confirm_password || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required={true}
                                        type={"password"}
                                    />
                                </Grid>
                            </Fragment>
                        )}

                         

					</Grid>

                    {/* <Grid container spacing={2} className={classes.container}>
                        

                    </Grid> */}
				</div>
			)}
		</Fragment>
	)

}

const CadastroAgente = formikEnhancer(CadastroAgenteForm)

export default CadastroAgente
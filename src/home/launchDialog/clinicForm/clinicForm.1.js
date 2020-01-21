import React, {Fragment} from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import classnames from 'classnames'
import TextInputBase from '../../../base/input/textInputBase'
import Grid from '@material-ui/core/Grid'

const formikEnhancer = withFormik({
    
  validationSchema: Yup.object().shape({    
    nome: Yup.string()
      .required('O campo nome é obrigatório!'),
    email: Yup.string()
      .required('O campo e-mail é obrigatório!')
      .email('Formato de e-mail não é válido!'),
  }),

  mapPropsToValues: ({ data }) => ({
    ...data,
  }),

  handleSubmit: (payload, { setSubmitting }) => {
    //alert(payload.email)
    setSubmitting(false)

  },

  displayName: 'Formulário',
})


const form = props => {
  
    const {
        values,
        touched,
        errors,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        isSubmitting,
    } = props

  return (
    <form onSubmit={handleSubmit}> 

        <Grid container spacing={2}>

            <Grid item xs={12} >     
                <TextInputBase
                    id="nome"
                    label="Nome da Clínica"
                    placeholder="Nome da Clínica"
                    error={touched.nome && errors.nome}
                    value={values.nome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                />

            </Grid>
            <Grid item xs={12} >     
                <TextInputBase
                    id="email"
                    label="E-mail"
                    placeholder="E-mail"
                    error={touched.email && errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={true}
                />

            </Grid>
        </Grid>

      {/* <button
        type="button"
        className="outline"
        onClick={handleReset}
        disabled={!dirty || isSubmitting}
      >
        Reset
      </button>
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button> */}
      
    </form>
  )
}

const ClinicForm = formikEnhancer(form)

export default ClinicForm
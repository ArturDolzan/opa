import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'
import axios from 'axios'


 const AutoComplete = (props) => {

  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const loading = open && options.length === 0

  React.useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    (async () => {

        try{
            const response = props.controller.recuperar(10, 1, [], ret => {
              
              if (active) {
                 setOptions(ret.data.data)
              }

            }, error => {              
              alert(error)
            })

        } catch(e) {            
            console.log(`Erro na requisição: ${e.message}`)
        }
    })()

    return () => {
      active = false
    }
  }, [loading])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Autocomplete
      id={props.id}
      loadingText={'Carregando...'}
      noOptionsText={'Nenhum valor selecionado'}
      onChange={props.getValueSelected}
      defaultValue={ props.defaultChave ? {[props.chave]: props.defaultChave, [props.valor]: props.defaultValor} : null}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionSelected={(option, value) => { 
          return option.nome === value.nome
        }
      }
      getOptionLabel={option => `${option[props.chave]} -  ${option[props.valor]}`}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          fullWidth
          variant="outlined"
          size={"small"}
          required={props.required || false}
          error={props.error ? true : false}
          helperText={props.error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}

AutoComplete.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    controller: PropTypes.any.isRequired,
    chave: PropTypes.string.isRequired,
    valor:  PropTypes.string.isRequired,
    defaultChave: PropTypes.number,
    defaultValor: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string
}

export default AutoComplete
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
            const response = await axios.get(props.url)

            const dados = await response.data

            if (active) {
                setOptions(dados)
            }

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
      id={props.nome}
      loadingText={'Carregando...'}
      noOptionsText={'Nenhum valor selecionado'}
      onChange={props.getValueSelected}
      defaultValue={ props.defaultChave ? {[props.chave]: props.defaultChave, [props.valor]: props.defaultValor} : null}
      style={{ width: 300 }}
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
          variant="standard"
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
    nome: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    chave: PropTypes.string.isRequired,
    valor:  PropTypes.string.isRequired,
    defaultChave: PropTypes.number,
    defaultValor: PropTypes.string
}

export default AutoComplete
import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

const TextInputBase = ({ type, id, label, error, value, onChange, required, ...props }) => {

    return (

        <Fragment>        
            <TextField
              id={id}
              onChange={onChange}
              value={value}          
              label={label}
              type={type}
              variant="outlined"
              size={"small"} 
              error={error ? true : false}
              helperText={error}
              fullWidth={true}
              required={required || false}
              {...props}
            />
        </Fragment>    
      )
}

TextInputBase.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.any,
  required: PropTypes.bool,
}

export default TextInputBase
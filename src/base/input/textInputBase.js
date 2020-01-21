import React, {Fragment} from 'react'
import TextField from '@material-ui/core/TextField'

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
              style={{width: "100%"}}
              required={required || false}
              {...props}
            />
        </Fragment>    
      )
}

export default TextInputBase
import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { green } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

const ButtonSave = (props) => {

  const classes = useStyles()

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  })

  return (

    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="Salvar"
          color="primary"
          className={buttonClassname}
          onClick={props.clickSave}
        >
          {props.success ? <CheckIcon /> : <SaveIcon />}

        </Fab>
        {props.loading && <CircularProgress size={68} className={classes.fabProgress} />}
      </div>
      
    </div>
  )
}

ButtonSave.propTypes = {
    loading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired
}

export default ButtonSave
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange, deepPurple } from '@material-ui/core/colors'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

const LetterAvatar = (props) => {

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Avatar className={classes.purple}>{props.letter}</Avatar>      
    </div>
  )
}

LetterAvatar.propTypes = {
    letter: PropTypes.string.isRequired
}

export default LetterAvatar
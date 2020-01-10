import React from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Slide from '@material-ui/core/Slide'

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />
}

const SnackBase = () => {

  const [open, setOpen] = React.useState(false)
  const [transition, setTransition] = React.useState(undefined)

  const handleClick = Transition => () => {
    setTransition(() => Transition)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      
      <Button onClick={handleClick(TransitionUp)}>Up</Button>

      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">I love snacks</span>}
      />
    </div>
  )
}

export default SnackBase
import React, {Fragment, useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LetterAvatar from '../base/letterAvatar'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

import { useSelector, connect } from "react-redux"
import {setLogout} from '../actions/authAction'

const useStyles = makeStyles(theme => ({
    typography: {
      padding: theme.spacing(4)
    },
    text: {
        padding: theme.spacing(1),
    },
    button: {
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: "200px",
        height: "200px"
    }
}))

const UserMenu = (props) => {

    const auth = useSelector(state => state.auth)

    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles()

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        handleClose()

        props.setLogout()
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

	useEffect(() => {

		 return () => {
		 	
		 }
    })
    
    const renderDetailWindow = () => {

        return (
            <Fragment>
                
                <Container maxWidth="sm" className={classes.button}>
                        
                    <IconButton
                        aria-label="Notificações"
                        aria-controls="menu-appbar"
                        aria-haspopup="false"
                        color="inherit"    
                        className={classes.image}                                     
                    >
                    
                        {!auth.isLogged && (
                            <AccountCircle />
                        )}

                        {auth.isLogged && (
                            <LetterAvatar isBig={true} letter={auth.email.substring(0,1)} />
                        )}
                                            
                    </IconButton>

                </Container>
                <Divider />
                <Container maxWidth="sm" className={classes.typography}>
                    <Typography align="center" className={classes.text}>{auth.email}</Typography>
                    <Typography align="center" className={classes.text}>{auth.name}</Typography>
                </Container>
                <Divider />
                <Container maxWidth="sm" className={classes.button}>
                    <Button variant="outlined" onClick={handleLogout}>Sair</Button>
                </Container>
            </Fragment>
        )
    }

    return (
        <Fragment>

            <IconButton
                aria-label="Usuário"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
              >
                <Badge badgeContent={11} color="secondary">
                    <NotificationsIcon />
                </Badge>

              </IconButton>

              <IconButton
                aria-label="E-mail"
                aria-controls="menu-appbar"
                aria-haspopup="false"
                color="inherit"
              >
                <Badge badgeContent={7} color="secondary">
                    <MailIcon />
                </Badge>

              </IconButton>
              
                <IconButton
					aria-label="Notificações"
					aria-controls="menu-appbar"
					aria-haspopup="false"
                    color="inherit"
                    onClick={handleClick}                
				>
				
                    {!auth.isLogged && (
                        <AccountCircle />
                    )}

                    {auth.isLogged && (
                        <LetterAvatar isBig={false} letter={auth.email.substring(0,1) } />
                    )}
					
					
				</IconButton>

                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                >
                    {renderDetailWindow()}
                </Popover>
			  
              
        </Fragment>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogout: () => { dispatch(setLogout()) }
    }
}

export default connect(null, mapDispatchToProps)(UserMenu)
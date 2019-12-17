import React, {Fragment} from 'react'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'

const UserMenu = () => {

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
              >
              
                <AccountCircle />
                
              </IconButton>
        </Fragment>
    )

}

export default UserMenu
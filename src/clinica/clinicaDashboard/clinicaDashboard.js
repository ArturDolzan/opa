import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ListIcon from '@material-ui/icons/List'
import AddIcon from '@material-ui/icons/Add'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },    
    header: {
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },      
  }))

const ClinicaDashboard = ({match, history}) => {

    const classes = useStyles()

    const renderContentCardList = () => {

        return (
            <Fragment>

                 <Card >
                    
                    <div className={classes.header}>
                        <Typography component="h6" variant="h6">
                            Clínicas
                        </Typography>
                    </div>
                    
                    <CardContent >

                        <Tooltip title="Lista" placement="right-end">
                            <IconButton color="primary" onClick={() => history.push(`${match.url}/clinica`)}>
                                <ListIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Cadastro" placement="right-end">
                            <IconButton color="secondary" onClick={() => history.push(`${match.url}/clinica/cadastro/0`)}>
                                <AddIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </CardContent>  

                </Card>
            </Fragment>
        )
    }

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Grid container spacing={3}>
                    
                    <Grid item sm={3}>

                        {renderContentCardList()}
                    </Grid>
                                
                </Grid>
            </div>

            
        </Fragment>
    )
}

export default ClinicaDashboard
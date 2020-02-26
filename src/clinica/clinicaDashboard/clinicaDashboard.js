import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import AddIcon from '@material-ui/icons/Add'
import FingerprintIcon from '@material-ui/icons/Fingerprint'
import BusinessIcon from '@material-ui/icons/Business'
import {withRouter} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    cursorPointer: {
        cursor: "pointer"
    },
    cardContent: {
        display: 'flex',
        alignItems: 'start',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
      },
      cardText: {
          paddingLeft: theme.spacing(1),
          paddingTop: theme.spacing(2),
      },
  }))

const ClinicaDashboard = ({match, history}) => {

    const classes = useStyles()

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Grid container spacing={2}>
                    
                    <Grid item sm={3}>

                        <Card >
                            <CardActionArea onClick={() => history.push(`${match.url}/paciente`)}>
                               
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Pacientes
                                    </Typography>

                                    <div className={classes.cardContent}>
                                        <FingerprintIcon fontSize={"large"} color="primary"/>
                                        <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                            Consultar, inserir, atualizar e remover pacientes...
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Tooltip title="Inserir novo" placement="right-end">
                                    <AddIcon className={classes.cursorPointer} color="secondary" onClick={() => history.push(`${match.url}/paciente/cadastro/0`)}/>
                                </Tooltip>
                            </CardActions>
                        </Card>

                    </Grid>

                    <Grid item sm={3}>

                        <Card >
                            <CardActionArea onClick={() => history.push(`${match.url}/clinica`)}>
                               
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Clínicas
                                    </Typography>

                                    <div className={classes.cardContent}>
                                        <BusinessIcon fontSize={"large"} color="primary"/>
                                        <Typography className={classes.cardText} variant="body2" color="textSecondary" component="p">
                                            Consultar, inserir, atualizar e remover clínicas...
                                        </Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Tooltip title="Inserir novo" placement="right-end">
                                    <AddIcon className={classes.cursorPointer} color="secondary" onClick={() => history.push(`${match.url}/clinica/cadastro/0`)}/>
                                </Tooltip>
                            </CardActions>
                        </Card>

                    </Grid>
                                
                </Grid>
            </div>

            
        </Fragment>
    )
}

export default withRouter(ClinicaDashboard)
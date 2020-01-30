import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
  }))

const ClinicaDashboard = ({match, history}) => {

    const classes = useStyles()

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Grid container spacing={3}>
                    
                    <Grid item sm={3}>

                        DASH
                    </Grid>
                                
                </Grid>
            </div>

            
        </Fragment>
    )
}

export default ClinicaDashboard
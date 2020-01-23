import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import CardBase from '../../base/cardBase'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    }
  }))

const ClinicaDashboard = () => {

    const classes = useStyles()

    const renderContentCardList = () => {

        return (
            <Fragment>
                Listas
            </Fragment>
        )
    }

    return (
        <Fragment>
            
            <div className={classes.root}>
                <Grid container spacing={3}>
                    
                    <Grid item md={3}>
                        <CardBase content={renderContentCardList()} />
                    </Grid>
                                
                </Grid>
            </div>

            
        </Fragment>
    )
}

export default ClinicaDashboard
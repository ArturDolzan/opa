import React, {Fragment, useEffect} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AutoRenewIcon from '@material-ui/icons/Autorenew'
import Tooltip from '@material-ui/core/Tooltip'
import { connect } from "react-redux"
import {open} from '../../actions/alertDialogBaseAction'

import Clinicas from '../../model/clinica/clinicas/clinicas'
import ClinicasController from '../../controller/clinica/clinicas/clinicasController'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paperGrid: {
        width: '100%',
        height: '100%',
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(1),
    },
    paperHeaderGrid: {
        display: 'flex',
        width: '100%',
        height: '100%',
        boxShadow: "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
        marginBottom: theme.spacing(1),
    },
    divPaperHeaderGrid: {
        minHeight: "75px", 
        display: "flex", 
        alignItems: "center"
    },
    marginLeft2: {
        marginLeft: theme.spacing(2),
    },
    fab: {
      position: 'absolute',      
      right: theme.spacing(5),
    },
    tableRow: {
        "&$selected, &$selected:hover": {
          backgroundColor: "#C3E8F9"
        },
        "&$hover:hover": {
            backgroundColor: "#DDF3FD"
          },
          userSelect: "none"
      },
    selected: {},
    hover: {}
}))


const ListaClinica = (props) => {

    const classes = useStyles()

    const columnsFormat = [
        { id: 'nome',  minWidth: 150 }
    ]

    useEffect(() => {

        buildColumns()

        listar(rowsPerPage, page + 1)

        return () => {
            
        }        
    }, [])

    const buildColumns = () => {

        let clinicas = new Clinicas()
        let fields = clinicas.fields.filter(item => !item.hidden)

        fields = fields.map((item, idx) => {
            
            let exists = columnsFormat.filter(data => data.id === item.id)[0]

            if (exists) {                
                item = {...item, ...exists}
            }

            return item
        })

        setColumns(fields)
    }

    const listar = (qtdePagina, numeroPagina) => {

        let clinicasController = new ClinicasController()

        let data = clinicasController.recuperar(qtdePagina, numeroPagina, (ret) => {

            setRows([...ret.data.data])            
        }, (error) => {

            props.open({
                title: "Ops",
                text: `Não foi possível listar. \n Erro: ${error.response.statusText}`
            })
        })
    }

    const [page, setPage] = React.useState(0)
    const [selectedID, setSelectedID] = React.useState(null)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [rows, setRows] = React.useState([])
    const [columns, setColumns] = React.useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage)

        listar(rowsPerPage, page + 1)
    }

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value)
        setPage(0)

        listar(rowsPerPage, page + 1)
    }

    const handleRefresh = () => {

        listar(rowsPerPage, page + 1)
    }

    const handleKeyDown = (event, row) => {
        
        if (event.keyCode === 13) {
            props.history.push(`${props.match.url}/cadastro/${row.id}`)
        }
    }



    return (
        <Fragment>

            <div className={classes.root}>

                <Grid item xs={12} >

                    <Grid container spacing={2}>

                        <Paper className={classes.paperHeaderGrid} variant="elevation1">

                            <div className={classes.divPaperHeaderGrid}>
                                <Tooltip title="Atualizar" placement="right-end">
                                    <IconButton className={classes.marginLeft2} aria-label="Atualizar" color="primary" onClick={handleRefresh}>
                                        <AutoRenewIcon />
                                    </IconButton>
                                </Tooltip>

                                <Typography variant="h6">
                                    Clínicas
                                </Typography>

                                <Tooltip title="Inserir novo" placement="left-end">
                                    <Fab aria-label="add" className={classes.fab} color="primary" onClick={() => props.history.push(`${props.match.url}/cadastro/0`)}>
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                            </div>

                        </Paper>

                        <Paper className={classes.paperGrid} variant="elevation1">
                            <TableContainer >
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>                                    
                                    <TableRow >

                                        <TableCell
                                            key={"editaction"}
                                            align={"left"}
                                            style={{ width: 5 }}
                                            >

                                        </TableCell>

                                        {columns.map((column, idx) => (
                                            <TableCell
                                            key={column.id}
                                            align={"left"}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {rows.map(row => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id} 
                                            onDoubleClick={() => props.history.push(`${props.match.url}/cadastro/${row.id}`)} 
                                            onKeyDown={(event) => {handleKeyDown(event, row)}}
                                            onClick={() => {setSelectedID(row.id)}} selected={selectedID === row.id} 
                                            classes={{ selected: classes.selected, hover: classes.hover }} 
                                            className={classes.tableRow}
                                            >

                                        <TableCell
                                            key={"editaction"}
                                            align={"left"}
                                            >
                                            <Tooltip title="Editar" placement="right-end">
                                                <IconButton size="small" aria-label="Editar" color="secondary" onClick={() => props.history.push(`${props.match.url}/cadastro/${row.id}`)}>
                                                    <EditIcon fontSize="small"/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>

                                        {columns.map(column => {
                                            const value = row[column.id];
                                            return (
                                            <TableCell key={`${column.id}`} align={"left"}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                            );
                                        })}
                                        </TableRow>
                                    );
                                    })}
                                </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 50]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                labelRowsPerPage={"Linhas por página"}
                            />
                            </Paper>
                    </Grid>

                </Grid>
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        open: (data) => { dispatch(open(data)) }
    }
}

export default connect(null, mapDispatchToProps)(ListaClinica)
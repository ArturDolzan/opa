import React, {useState} from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import url from '../config/urlApi'

import { connect } from "react-redux"
import {setValorIslogged, setAuth} from '../actions/authAction'
import {open} from '../actions/alertDialogBaseAction'


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Signup = (props) => {
  
    const [data, setData] = useState({
        stageNew: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        loading: false
    }) 

    const handleChange = event => {
        setData({...data,
            [event.target.id]: event.target.value
        })
    }

    const validateForm = () => {
        return (!data.stageNew && data.email.length > 0 && data.password.length > 0) 
            || (data.stageNew && data.name.length > 0 && data.email.length > 0 && data.password.length > 0 && data.confirmPassword.length > 0 && data.password === data.confirmPassword)
    }

    const login = () => {

        if (!data.stageNew) {
          	props.setAuth(data)
        } else {

					//props.setNewAuth(data)
					newAuth((response) => {

							props.open({
								title: "Nova Conta",
								text: `Bem-vindo ${data.name} =) Sua conta foi criada com sucesso! \n\n Um e-mail foi encaminhado para ativar sua conta. Favor verificar sua caixa de entrada...`
							})

							setData({...data, stageNew: !data.stageNew})

					}, (error) => {
						
						props.open({
							title: "Nova Conta",
							text: `Ops =( Ocorreu um erro ao criar a conta. \n Detalhe: ${error.response.data}`
						})

					})

				}
        
		}
		
		const newAuth = (cbSucess, cbError) => {

				axios.post(`${url}/signup`, {
						email: data.email,
            password: data.password,
            name: data.name,
						idplano: 2
				})
				.then(cbSucess)
				.catch(cbError)
		}

    const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Acessar
        </Typography>
        <form className={classes.form} noValidate>

            {data.stageNew && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Nome"
                        autoFocus
                        value={data.name}                
                        onChange={handleChange}
                    />
                    </Grid>
                </Grid>
            )}
            
            <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
                value={data.password}
                onChange={handleChange}
              />
            </Grid>
            {data.stageNew && (
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmação de senha"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                />
                </Grid>
            )}
             
            
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateForm()}
            onClick={login}
          >
            {data.stageNew ? "Criar conta" : "Acessar"}
          </Button>
        <Grid container justify="center">
            <Grid item>
              <Link                 
                onClick={() => setData({...data, stageNew: !data.stageNew})}                 
                variant="body2"
                style={{cursor: "pointer"}}
                >
                {!data.stageNew ? "Não possui conta?" : "Já possui conta? Acesse aqui"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValorIslogged: (auth) => { dispatch(setValorIslogged(auth)) },
				setAuth: (auth) => { dispatch(setAuth(auth)) },
				open: (data) => { dispatch(open(data)) }
    }
}

export default connect(null, mapDispatchToProps)(Signup)
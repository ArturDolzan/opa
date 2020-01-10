import React, {Fragment} from 'react'
import Button from '@material-ui/core/Button'

import AutoComplete from '../base/autoComplete'
import BackdropBase from '../base/backdropBase'

import { useDispatch, useSelector, connect } from "react-redux"
import { SET_LOGGED } from "../reducers/authReducer"

import {setValorIslogged} from '../actions/authAction'

const Home = (props) => {

    const valueFromAutoComplete = (event, value) => {

           
    }

    const auth = useSelector(state => state.auth)
    
    return (
        <Fragment>

            <div>{JSON.stringify(auth)}</div>

            <Button variant="contained" color="primary" onClick={() => props.setValorIslogged(true)}>
                Teste
            </Button>

        {/* <AutoComplete 
            nome={'teste'} 
            label={'Opaaaa'} 
            url={'https://teste.infisio.com.br/produtos'}       
            chave={'id'}
            valor={'nome'}
            defaultChave={1}
            defaultValor={'TUCA'}
            getValueSelected={valueFromAutoComplete}
            /> */}

        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setValorIslogged: (auth) => { dispatch(setValorIslogged(auth)) }
    }
}

export default connect(null, mapDispatchToProps)(Home)
import {SET_LOGGED} from '../reducers/authReducer'

const alterarValorLogged = isLogged => ({
    type: SET_LOGGED,
    payload: isLogged
})


export const setValorIslogged = (isLogged) => (
   (dispatch, getState) => {
        
        dispatch(alterarValorLogged(isLogged))    
    }
);
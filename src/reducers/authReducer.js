export const SET_LOGGED = 'SET_LOGGED'
export const SET_AUTH = 'SET_AUTH'
 
const initialState = {   
    isLogged: false,
    email: '',
    name: '',
    idtenant: null,
    token: null
}
 
export default (state = initialState, action) => {
 //console.log(action)
   switch(action.type) {
       case SET_LOGGED:
  
           return {
                ...state,
                isLogged: action.payload
            }

        case SET_AUTH:

           return {
                ...state,
                isLogged: action.payload.isLogged,
                email: action.payload.email,
                idtenant: action.payload.idtenant,
                token: action.payload.token,
                name: action.payload.name
            }
           
       default:
           return state;
   }
}

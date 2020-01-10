export const SET_LOGGED = 'SET_LOGGED'
 
const initialState = {   
    isLogged: false,
    email: ''
}
 
export default (state = initialState, action) => {
 //console.log(action)
   switch(action.type) {
       case SET_LOGGED:
  
           return {
                ...state,
                isLogged: action.payload
            }         
           
       default:
           return state;
   }
}

import authReducer from './authReducer'
import alertDialogBaseReducer from './alertDialogBaseReducer'
import circularProgressBaseReducer from './circularProgressBaseReducer'
import formDialogBaseReducer from './formDialogBaseReducer'
import snackBaseReducer from './snackBaseReducer'

export default {    
    auth: authReducer,
    alertDialogBase: alertDialogBaseReducer,
    circularProgressBase: circularProgressBaseReducer,
    formDialogBase: formDialogBaseReducer,
    snackBase: snackBaseReducer,
}
import authReducer from './authReducer'
import alertDialogBaseReducer from './alertDialogBaseReducer'
import circularProgressBaseReducer from './circularProgressBaseReducer'
import formDialogBaseReducer from './formDialogBaseReducer'

export default {    
    auth: authReducer,
    alertDialogBase: alertDialogBaseReducer,
    circularProgressBase: circularProgressBaseReducer,
    formDialogBase: formDialogBaseReducer
}
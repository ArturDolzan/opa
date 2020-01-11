import React, {Fragment} from 'react'
import Menu from '../menu/menu'
import Signup from '../login/signup'

import { useSelector } from "react-redux"

const Main = () => {

    const auth = useSelector(state => state.auth)

    return (
        <Fragment>
             
             {!auth.isLogged && (
                 <Signup/>
             )}             

             {auth.isLogged && (
                 <Menu/>
             )}             
        </Fragment>
    )
}

export default Main
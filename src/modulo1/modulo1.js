import React, {Fragment} from 'react'

import { useDispatch, useSelector } from "react-redux"

const Modulo1 = () => {

    const auth = useSelector(state => state.auth)

    return (
        <Fragment>
            
            <div>{JSON.stringify(auth)}</div>
            Modulo1

        </Fragment>
    )
}

export default Modulo1
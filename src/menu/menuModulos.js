import React, {Fragment, Suspense, lazy} from 'react'
import {Route, Redirect} from 'react-router-dom'

import Home from '../home/home'
const Modulo1 = lazy(() => import('../modulo1/modulo1'))

const MenuModulos = (props) => {

    return (
        <Fragment>
            
            <main className={props.classes.content}>
                <div className={props.classes.toolbar} />
                
                <Route path="/home" component={Home}/>

                <Suspense fallback={
                        <div>
                            Aguarde...
                        </div>
                    }>
                        <Route path="/modulo1" component={Modulo1}/>
                </Suspense>

                <Route exact path="/" render={() => (
                    <Redirect to="/home"/>
                )}/>

            </main>

        </Fragment>
    )
}

export default MenuModulos
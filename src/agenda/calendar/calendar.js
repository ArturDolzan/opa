import React, {Fragment, useEffect} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br'

import { connect } from "react-redux"
import {openSnackBase} from '../../actions/snackBaseAction'

const localizer = momentLocalizer(moment) 

const CalendarInfisio = (props) => {

    useEffect(() => {

        newAppointment()

        return () => {
            
        }        
    }, [])

    const [events, setEvents] = React.useState([])

    const newAppointment = () => {

        let appointment = { title: 'Teste', start:  new Date("2020-01-24 08:30:00"), end: new Date("2020-01-24 11:30:00"), desc: 'Descrição' }

        let newEvents = [...events]
        newEvents.push(appointment)

        setEvents(newEvents)
    }

    const handleSlotSelected = (slotInfo) => {
        
        props.openSnackBase(slotInfo.start.getHours())
    }

    const handleEventSelected = (event) => {
        debugger
     }
  
    return (
        <Fragment>
            
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                defaultDate={new Date()}
                selectable={true}
                onSelectSlot={slotInfo => handleSlotSelected(slotInfo)}
                onSelectEvent={event => handleEventSelected(event)}
                messages={{next:"Próximo",previous:"Anterior",today:"Hoje", month: 'Mês', week: 'Semana', day: 'Dia', agenda: 'Eventos', noEventsInRange: 'Não há eventos'}}
            />
            
        </Fragment>
    )  
}

const mapDispatchToProps = (dispatch) => {
    return {
        openSnackBase: (text) => { dispatch(openSnackBase(text)) }
    }
}
  
export default connect(null, mapDispatchToProps)(CalendarInfisio)

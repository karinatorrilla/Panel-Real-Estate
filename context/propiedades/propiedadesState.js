import React, { useReducer } from 'react';
import PropiedadContext from './propiedadesContext';
import propiedadesReducer from './propiedadesReducer';

import {

    SELECCIONAR_BROKER

} from '../../types'

const PropiedadState = ({children}) => {

    //Creamos el state de propiedades
    const initialState = {
        //State inicial 
        broker: {}
    }

    //devuelvo la state , dispatch concecta con los types y evalua los diferentes cases
    const [ state, dispatch ] = useReducer( propiedadesReducer, initialState );

    //Modificar broker, lo paso en value
    const agregarBroker = broker => {
        // console.log(broker);
        dispatch({
            type: SELECCIONAR_BROKER,
            payload: broker
        })
    }

    return(
        <PropiedadContext.Provider
            value={{
                agregarBroker   
            }}
        > 
        {children}
            
        </PropiedadContext.Provider>
    )
}
export default PropiedadState;
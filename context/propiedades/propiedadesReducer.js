import {

    SELECCIONAR_BROKER
    
} from '../../types'

//modifica el state de la aplicacion
export default ( state, action ) => {

    switch(action.type){

        case SELECCIONAR_BROKER: 
            return{
                ...state,
                //viene del exterior para modificar el broker
                broker: action.payload
            }

        default:
            return state
    }
}
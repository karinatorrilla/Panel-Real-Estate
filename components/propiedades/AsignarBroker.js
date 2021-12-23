import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { useQuery, gql } from '@apollo/client';
import PropiedadContext from '../../context/propiedades/propiedadesContext';


const LISTADO_BROKERS = gql`
  query brokers{
    brokers{
      id
      name
      address
    }
  }
`;

const AsignarBorker = () => {

    const [broker, setBroker] = useState([]);

    const propiedadContext = useContext(PropiedadContext);
    // //traigo lo que necesito
    const { agregarBroker } = propiedadContext;

    //Consulta a la db
    const { data, loading, error } = useQuery(LISTADO_BROKERS);

    //Cada vez que cambia de broker
    useEffect ( () =>{

        agregarBroker(broker)

    }, [broker])

    const seleccionarBroker = broker =>{

        setBroker( broker );
    }

    //Resultado de la consulta 
    if(loading) return null;

    const { brokers  } = data;


    return(

        <>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='broker'>Asignar un broker a la propiedad</label>
                <Select

                    className="mt-3"
                    options={ brokers }
                    onChange={ opcion => seleccionarBroker(opcion) }
                    getOptionValue = { opciones => opciones.id }
                    getOptionLabel = { opciones => opciones.name }
                    placeholder = 'Seleccione un Broker'
                    noOptionsMessage= {() => "No hay resultados"}

                />
            </div>
        </>
    )
}

export default AsignarBorker;

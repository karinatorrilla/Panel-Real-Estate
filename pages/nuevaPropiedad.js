import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarBorker from '../components/propiedades/AsignarBroker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

//context de Propiedades
import PropiedadContext from '../context/propiedades/propiedadesContext';


const NUEVA_PROPIEDAD = gql`
    mutation createProperty($propertyInput: PropertyInput!){
        createProperty(propertyInput: $propertyInput){
            id
        }
    }
`;



const nuevaPropiedad= () => {

    //Utilizar context y extraer sus valores

    const propiedadContext = useContext(PropiedadContext);

    return(
        <Layout>

            <h1 className="text-2xl py-2 text-gray-800 font-bold text-left mt-5 leading-5">Nueva Propiedad</h1>
            <div className="flex justify-center mt5">
                <div className="w-full max-w-lg">
                    
                    <AsignarBorker/>

                </div>
            </div>

        </Layout>
    );
}

export default nuevaPropiedad;
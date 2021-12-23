import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_BROKER = gql`
    mutation createBroker($brokerInput : BrokerInput! ){
        createBroker(brokerInput : $brokerInput){
            id
            name
            address
        }
    }
`;

const LISTADO_BROKERS = gql`
  query brokers{
    brokers{
      id
      name
      address
    }
  }
`;

const nuevoBroker= () => {
    //State para el msj
    const [mensaje, guardarMensaje] = useState(null);
    //Routing
    const router = useRouter();

    //Mutacion para crear Broker
    const [createBroker] = useMutation(NUEVO_BROKER , {
        update( cache, { data: { createBroker } } ) {
            //Obtener el objeto del cache que queremos actualizar(tomamos una copia de lo que hay actualmente en cache)
            const { brokers } = cache.readQuery( { query: LISTADO_BROKERS } )
            //Reescribo el cache
            cache.writeQuery({
                query: LISTADO_BROKERS,
                data: {
                    brokers : [...brokers, createBroker]
                }
            })
        }
    });

    //validacion del formulario
    const formik = useFormik({
        initialValues: {
            name: '',
            address: ''
        },
        validationSchema: Yup.object({
            name : Yup.string()
            .required('El nombre es obligatorio')
        }),
        onSubmit: async valores =>{
            const { name, address} = valores
            try {
                const { data } = await createBroker({
                    variables: {
                        brokerInput: {
                            name,
                            address
                        }
                    }
                });
                //Muestro alert de correcto
                Swal.fire(
                    'Creado',
                    'Se ha creado correctamente el broker!',
                    'success'
                )
                //Si todo esta ok, redirecciono a la lista
                router.push('/');  
            } catch (error) {
                //muestro mensaje de error
                guardarMensaje(error.message.replace('GraphQL error: ', ''));
                setTimeout(() => {
                    guardarMensaje(null);

                }, 3000);
            }
        }
    });

    //Muestro mensaje de error
    const mostrarMensaje = () => {
        return(
            <div className="bg-white w-full py-2 px-3 my-3 max-w-sm text-center mx-auto">
                <p> {mensaje} </p>
            </div>
        )
    }

    return(
        <Layout>
            <h1 className="text-2xl py-2 text-gray-800 font-bold text-left mt-5 leading-5">Nuevo Broker</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='name'>Nombre</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder='Nombre Broker'
                            value={formik.values.name}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.name && formik.errors.name ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        )  : null}
                        {/* Address */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='address'>Dirección</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder='Dirección Broker'
                            value={formik.values.address}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.address && formik.errors.address ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.address}</p>
                            </div>
                        )  : null}
                        <input type='submit' className=' cursor-pointer bg-red-400 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-red-600' value='Crear Broker' />
                    </form>
                </div>

            </div>
        </Layout>
    );
}
export default nuevoBroker;
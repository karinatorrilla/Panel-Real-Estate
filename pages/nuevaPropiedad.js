import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AsignarBorker from '../components/propiedades/AsignarBroker';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//context de Propiedades
import PropiedadContext from '../context/propiedades/propiedadesContext';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';


const NUEVA_PROPIEDAD = gql`
    mutation createProperty($propertyInput: PropertyInput!){
        createProperty(propertyInput: $propertyInput){
            brokerId
            address
            latitude
            longitude
            price
            currency
        }
    }
`;

const LISTADO_PROPIEDADES = gql`
    query properties{
        properties{
        id
        broker {
            id
            name
            address
        }
        address
        latitude
        longitude
        price
        currency
        }
    }
`;


const nuevaPropiedad= () => {

    //State para el msj
    const [mensaje, guardarMensaje] = useState(null);
    //Routing
    const router = useRouter();


    //Utilizar context y extraer sus valores
    const propiedadContext = useContext(PropiedadContext);
    const { broker } = propiedadContext;
    //este se llena cuando seleccione un Broker
    // console.log(broker);
    //Mutacion para Crear Propiedad
    const [createPropiedad] = useMutation(NUEVA_PROPIEDAD , {
        update( cache, { data: { createPropiedad } } ) {
            //Obtener el objeto del cache que queremos actualizar(tomamos una copia de lo que hay actualmente en cache)
            const { propiedades } = cache.readQuery( { query: LISTADO_PROPIEDADES } )
            //Reescribo el cache
            cache.writeQuery({
                query: LISTADO_PROPIEDADES,
                data: {
                    propiedades : [...propiedades, createPropiedad]
                }
            })
        }
    });
    
    //Validacion de formulario
    const formik = useFormik({
        initialValues: {
            address: '',
            latitude: '',
            longitude: '',
            price: '',
            currency: ''

        },validationSchema: Yup.object({
            address : Yup.string()
            .required('La dirección es obligatoria')
        }),
        onSubmit: async () =>{
            const { id } = broker.id;
            // const {address, latitude, longitude, price, currency, broker} = valores
            try {
                const { data } = await createPropiedad({
                    variables: {
                        propertyInput: {

                            brokerId: id,
                            address,
                            latitude,
                            longitude,
                            price,
                            currency

                        }
                    }
                });
                //Muestro alert de correcto
                Swal.fire(
                    'Creado',
                    'Se ha creado correctamente la propiedad!',
                    'success'
                )
                //Si todo esta ok, redirecciono a la lista
                router.push('/propiedades');  
            } catch (error) {
                //muestro mensaje de error
                // console.log(error);
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

            <h1 className="text-2xl py-2 text-gray-800 font-bold text-left mt-5 leading-5">Nueva Propiedad</h1>
            {mensaje && mostrarMensaje()}
            <div className="flex justify-center mt5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
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
                        {/* Latitud */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='latitude'>Latitud</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="latitude" type="number" placeholder='Latitud Porpiedad'
                            value={formik.values.latitude}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.latitude && formik.errors.latitude ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.latitude}</p>
                            </div>
                        )  : null}
                        {/* Longitud */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='longitude'>Longitud</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="longitude" type="number" placeholder='Longitud Porpiedad'
                            value={formik.values.longitude}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.longitude && formik.errors.longitude ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.longitude}</p>
                            </div>
                        )  : null}
                        {/* Precio */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='price'>Precio</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder='Precio Porpiedad'
                            value={formik.values.price}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.price && formik.errors.price ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        )  : null}
                        {/* Moneda */}
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor='currency'>Moneda</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currency" type="text" placeholder='Moneda Porpiedad'
                            value={formik.values.currency}
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                        />
                        </div>
                        { formik.touched.currency && formik.errors.currency ?(
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.currency}</p>
                            </div>
                        )  : null}
                        
                            <AsignarBorker/>

                        <input type='submit' className=' cursor-pointer bg-red-400 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-red-600' value='Crear Propiedad' />
                    </form>

                </div>
            </div>

        </Layout>
    );
}

export default nuevaPropiedad;
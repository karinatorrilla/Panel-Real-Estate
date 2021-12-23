import React, {useEffect, useState} from 'react';

import { gql, useQuery } from '@apollo/client';

const LISTADO_PROPIEDADES = gql`
query properties{
    properties{
      id
    }
  }
`;

const Propiedad = ({propiedad}) => {
    // console.log(propiedad);
    return(
        <div className='flex mt-4 w-full bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg cursor-pointer'>
            <div className='bg-white sm:w-2/3 xl:w-4/5 w-1/6 '>
                <div className='p-2 w-full'>
                    <img src='https://perkinelmer.com.ar/wp-content/themes/perkinelmer/img/default-image.jpg'/>
                </div>
            </div>
            <div className='sm:w-2/3 xl:w-4/5 p-2 w-5/6'>
                <div className='flex mb-2'>
                    <h1 className=' w-3/6 justify-items-start font-bold border-r-2 mr-2'>$ {propiedad.price} {propiedad.currency}</h1>
                    <h1 className=' w-3/6 justify-items-start font-bold pl-2'>{propiedad.address}</h1> 
                </div>
                <div className='w-full justify-items-start pt-5 mb-8'>
                    <h2 className='font-bold text-gray-800 text-lg  pb-3'>Detalles</h2>
                    <div className='w-full block'>
                        <span className='font-bold text-gray-800 inline-block pb-1'>Latitud: </span><span className='pl-3'>{propiedad.latitude}</span>
                    </div>
                    <div className='w-full block'>
                        <span className='font-bold text-gray-800 inline-block'>Longitud: </span><span className='pl-3'>{propiedad.longitude}</span>
                    </div>
                </div>
                <div className='w-full flex border-t-2 mt-2'>
                    <div key={propiedad.broker.id} className='mt-1'>
                        <span className='font-bold text-gray-800 inline-block mt-3'>{propiedad.broker.name}</span><span className='mt-3 pl-3'>{propiedad.broker.address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Propiedad;
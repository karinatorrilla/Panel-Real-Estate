import Layout from '../components/Layout';
import Propiedad from '../components/Propiedad';
import { gql, useQuery  } from '@apollo/client';
import Link from 'next/link';

const LISTADO_PROPIEDADES = gql`
    query properties{
        properties{
        id
        broker {
            id
            name
            address
        },
        address
        latitude
        longitude
        price
        currency
        }
    }
`;



const  Propiedades = () => {
    
    
    const { data, loading, error } = useQuery(LISTADO_PROPIEDADES);

    if(loading) return null;
    // console.log(data);
  return (
    <div>
      <Layout>
          <div className='flex justify-between'>
            <h1 className="text-2xl py-2 text-gray-800 font-bold text-center mt-5 leading-5">Propiedades</h1>
            <Link href="/nuevaPropiedad">
                <a className=' cursor-pointer bg-red-400 font-bold uppercase text-sm rounded py-2 px-5 mt-5 flex justify-center items-center text-white hover:bg-red-600 mb-3 shadow-md w-full lg:w-auto text-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Crear Nueva Propiedad
                </a>
            </Link>
          </div>
        { data.properties.length === 0 ?(
                <p className="mt-5 text-center text-2xl">No hay listado de propiedades</p>
            ):(
                data.properties.map(propiedad =>(
                    <Propiedad
                        key={propiedad.id}
                        propiedad={propiedad}
                    />
                )) 
        )}
      </Layout>
    </div>
  )
}
export default Propiedades;
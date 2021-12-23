import Layout from '../components/Layout';
import Broker from '../components/Broker';
import { gql, useQuery  } from '@apollo/client';
import Link from 'next/link';

const LISTADO_BROKERS = gql`
  query brokers{
    brokers{
      id
      name
      address
    }
  }
`;

const  Index = () => {

  //Consulta de apollo
  const { data, loading, error } = useQuery(LISTADO_BROKERS);
  
  if(loading) return "Cargando..."


  return (
    <div>
      <Layout>
        <div className='flex justify-between'>
          <h1 className="text-2xl py-2 text-gray-800 font-bold text-center mt-5 leading-5">Brokers</h1>
          <Link href="/nuevoBroker">
            <a className=' cursor-pointer bg-red-400 font-bold uppercase text-sm rounded py-2 px-5 mt-5 flex justify-center items-center text-white hover:bg-red-600 mb-3 shadow-md w-full lg:w-auto text-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Crear Nuevo Broker
            </a>
          </Link>
        </div>

        {/* tabla listado brokers */}
        <div className="overflow-hidden-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className='bg-red-500'>
              <tr className='text-white'>
                <th className="w-1/3 py-2">ID</th>
                <th className="w-1/3 py-2">Nombre</th>
                <th className="w-1/3 py-2">Dirección</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.brokers.map( broker => (
                <Broker
                  key={broker.id}
                  broker={broker}
                />
              ) )}
            </tbody>
          </table>
        </div>

      </Layout>
    </div>
  )
}
export default Index;
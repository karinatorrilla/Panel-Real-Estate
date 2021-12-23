import React from 'react';
import { gql } from '@apollo/client';

const LISTADO_BROKERS = gql`
  query brokers{
    brokers{
      id
      name
      address
    }
  }
`;

const Broker = ({broker}) => {

    const { name, address, id } = broker;
    return(
        <tr>
            <td className="border px-4 py-2" >{id}</td>
            <td className="border px-4 py-2" >{name}</td>
            <td className="border px-4 py-2">{address}</td>
        </tr>
    );
}

export default Broker;
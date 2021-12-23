import '../styles/globals.css';
import { ApolloProvider } from "@apollo/client";
import PropiedadState from '../context/propiedades/propiedadesState';
import client from "../config/apollo";

//Archivo principal para que Apollo sea global a el resto de archivos
function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <PropiedadState> 
      
        <Component {...pageProps} />

      </PropiedadState>
    </ApolloProvider>
  ); 
}

export default MyApp;

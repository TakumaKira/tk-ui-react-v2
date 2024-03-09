import { ReactNode } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

export type BeerShopApolloProviderProps = {
  children: ReactNode;
};

export function AcmeApolloProvider({ children }: BeerShopApolloProviderProps) {
  const gatewayUrl = process.env?.BACKEND_URL;
  
  const client = new ApolloClient({
    uri: gatewayUrl,
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

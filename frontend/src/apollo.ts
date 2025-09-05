import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri:
    (import.meta as { env?: { VITE_API_BASE?: string } }).env?.VITE_API_BASE ??
    "http://localhost:8000/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

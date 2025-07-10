import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_HOST } from "./config";

export const apolloClient = new ApolloClient({
  uri: `https://${API_HOST}/graphql`,
  cache: new InMemoryCache(),
}); 
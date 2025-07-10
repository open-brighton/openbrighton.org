import { ApolloClient, InMemoryCache } from "@apollo/client";

// Dynamically get API_HOST from config.js or fallback
let API_HOST = "api.openbrighton.org";
try {
  // @ts-ignore
  API_HOST = require("./config.js").API_HOST || API_HOST;
} catch (e) {
  // fallback to default
}

export const apolloClient = new ApolloClient({
  uri: `https://${API_HOST}/graphql`,
  cache: new InMemoryCache(),
}); 
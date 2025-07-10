"use client";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apolloClient";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

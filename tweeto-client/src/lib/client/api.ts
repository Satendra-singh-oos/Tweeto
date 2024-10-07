import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== "undefined";

//! make this false for local development
const awsDeploy = true;
export const graphqlClient = new GraphQLClient(
  awsDeploy
    ? (process.env.NEXT_PUBLIC_API_DEPLOY_URL as string)
    : (process.env.NEXT_PUBLIC_API_LOCAL_URL as string), // local URL is used
  {
    headers: () => ({
      Authorization: isClient
        ? `Bearer ${window.localStorage.getItem("__twitter_token")}`
        : "",
    }),
  }
);

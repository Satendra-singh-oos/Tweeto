import { graphql } from "@/lib/gql";

export const verifyUserGoogleTokenQuery = graphql(`
  #graphql

  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query Query {
    getCurrentUser {
      id
      firstName
      lastName
      profileImageURL
    }
  }
`);

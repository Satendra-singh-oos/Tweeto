import { graphql } from "@/lib/gql";

export const followUserMutation = graphql(`
  #graphql
  mutation FollowUser($to: ID!) {
    followUser(to: $to)
  }
`);

export const unfollowUserMutation = graphql(`
  #graphql
  mutation UnfollowUser($to: ID!) {
    unfollowUser(to: $to)
  }
`);

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../client/api";
import { getAllTweetsQuery } from "../graphql/query/tweet";
import { createTweetMutation } from "../graphql/mutation/tweet";
import { CreateTweetData } from "../gql/graphql";
import toast from "react-hot-toast";

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["all-tweets"],
    queryFn: () => graphqlClient.request(getAllTweetsQuery),
  });
  return { ...query, tweets: query.data?.getAllTweets };
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) =>
      graphqlClient.request(createTweetMutation, { payload }),
    onMutate: () => toast.loading("Creating Tweet", { id: "1" }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tweets"] });
      toast.success("Created Success", { id: "1" });
    },
  });

  return mutation;
};

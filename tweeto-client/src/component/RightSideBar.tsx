"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../lib/client/api";
import { verifyUserGoogleTokenQuery } from "../lib/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks/user";

const RightSideBar = () => {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error("Google TOken Not Found");
      }

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Sucess");

      if (verifyGoogleToken) {
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
    [queryClient]
  );
  return (
    <div>
      {" "}
      {!user && (
        <div className="p-5 bg-slate-700 rounded-lg">
          <h1 className="my-2 text-2xl font-bold">New To Tweeto ? </h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>
      )}
    </div>
  );
};

export default RightSideBar;

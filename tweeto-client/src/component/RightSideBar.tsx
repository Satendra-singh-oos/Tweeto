"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../lib/client/api";
import { verifyUserGoogleTokenQuery } from "../lib/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks/user";
import Image from "next/image";
import Link from "next/link";

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
      {!user ? (
        <div className="p-5 bg-slate-700 rounded-lg">
          <h1 className="my-2 text-2xl font-bold">New To Tweeto ? </h1>
          <GoogleLogin onSuccess={handleLoginWithGoogle} />
        </div>
      ) : (
        <div className="px-4 py-3 bg-slate-800 rounded-lg">
          <h1 className="my-2 text-2xl mb-5">Users you may know</h1>
          {user?.recommendedUsers?.map((el) => (
            <div className="flex items-center gap-3 mt-2" key={el?.id}>
              {el?.profileImageURL && (
                <Image
                  src={el?.profileImageURL}
                  alt="user-image"
                  className="rounded-full"
                  width={60}
                  height={60}
                />
              )}
              <div>
                <div className="text-lg">
                  {el?.firstName} {el?.lastName}
                </div>
                <Link
                  href={`/profile/${el?.id}`}
                  className="bg-white text-black text-sm px-5 py-1 w-full rounded-lg"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;

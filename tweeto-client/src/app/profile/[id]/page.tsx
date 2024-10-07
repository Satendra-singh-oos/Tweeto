"use client";
import FeedCard from "@/component/FeedCard";
import TwitterLayout from "@/component/TwitterLayout";
import { graphqlClient } from "@/lib/client/api";
import { Tweet, User } from "@/lib/gql/graphql";
import {
  followUserMutation,
  unfollowUserMutation,
} from "@/lib/graphql/mutation/user";
import { getUserByIdQuery } from "@/lib/graphql/query/user";
import { useCurrentUser } from "@/lib/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeftShort } from "react-icons/bs";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!user) return false;
    return (
      (currentUser?.following?.findIndex((el) => el?.id === user?.id) ?? -1) >=
      0
    );
  }, [currentUser?.following, user]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfofromId = await graphqlClient.request(getUserByIdQuery, {
          id: String(id),
        });

        const fetchedUser = userInfofromId.getUserById;

        if (fetchedUser) {
          setUser(fetchedUser as User);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        toast.error("Error fetching user info:");
      }
    };

    if (id) {
      fetchUserInfo();
    }
  }, [id]);

  const handleFollowUser = useCallback(async () => {
    console.log("hi");
    if (!user?.id) return;
    const respone = await graphqlClient.request(followUserMutation, {
      to: user?.id,
    });
    console.log(respone);

    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
    toast.success("You Followed The User 😃");
  }, [user?.id, queryClient]);

  const handleUnfollowUser = useCallback(async () => {
    if (!user?.id) return;

    await graphqlClient.request(unfollowUserMutation, {
      to: user.id,
    });
    await queryClient.invalidateQueries({ queryKey: ["curent-user"] });
    toast.error("You Unfollowed The User 😔");
  }, [user?.id, queryClient]);

  return (
    <>
      <TwitterLayout>
        <div>
          <div>
            <nav className="flex items-center gap-3 py-3 px-3">
              <Link href="/">
                <BsArrowLeftShort className="text-4xl" />
              </Link>
            </nav>
            <h1 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <h1 className="text-md font-bold text-slate-500">
              {user?.tweets?.length} Tweets
            </h1>
          </div>

          <div className="p-4 border-b border-slate-800">
            {user?.profileImageURL && (
              <Image
                src={user.profileImageURL}
                alt="user-image"
                className="rounded-full"
                width={100}
                height={100}
              />
            )}

            <h1 className="text-2xl font-bold mt-5">
              {" "}
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-sm text-gray-400">
                <span> {user?.followers?.length} Followers</span>
                <span> {user?.following?.length} Following</span>
              </div>

              {currentUser?.id !== user?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnfollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-red-500"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold hover:bg-[#1d9bf0]"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>

            <div>
              {user?.tweets?.map((tweet) => (
                <FeedCard data={tweet as Tweet} key={tweet?.id} />
              ))}
            </div>
          </div>
        </div>
      </TwitterLayout>
    </>
  );
}

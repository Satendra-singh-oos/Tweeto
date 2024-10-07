"use client";
import FeedCard from "@/component/FeedCard";
import LeftSideBar from "@/component/LeftSideBar";
import RightSideBar from "@/component/RightSideBar";
import TwitterLayout from "@/component/TwitterLayout";
import { graphqlClient } from "@/lib/client/api";
import { Tweet, User } from "@/lib/gql/graphql";
import { getUserByIdQuery } from "@/lib/graphql/query/user";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsArrowLeftShort } from "react-icons/bs";

const page = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>();

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
};

export default page;

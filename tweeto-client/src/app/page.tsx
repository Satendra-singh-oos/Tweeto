"use client";
import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import {
  BiHomeCircle,
  BiHash,
  BiBookmark,
  BiUser,
  BiImageAlt,
} from "react-icons/bi";
import { BsBell, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/component/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../lib/client/api";
import { verifyUserGoogleTokenQuery } from "../lib/graphql/query/user";
import { useCurrentUser } from "@/lib/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/lib/hooks/tweet";
import { Tweet } from "@/lib/gql/graphql";

interface TwitterSidebarBtn {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItem: TwitterSidebarBtn[] = [
  { title: "Home", icon: <BiHomeCircle /> },
  { title: "Explore", icon: <BiHash /> },
  { title: "Notification", icon: <BsBell /> },
  { title: "Messages", icon: <BsEnvelope /> },
  { title: "Bookmarks", icon: <BiBookmark /> },
  { title: "Profile", icon: <BiUser /> },
  { title: "More Options", icon: <SlOptions /> },
];

export default function Home() {
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
  const queryClient = useQueryClient();
  const { mutateAsync } = useCreateTweet();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [mutateAsync, content, imageURL]);
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
      <div className="grid grid-cols-12 h-screen px-48">
        <div className="col-span-3 pt-8 px-4 relative">
          <div className="text-3xl h-fit hover:bg-gray-800 rounded-full px-2 py-1 cursor-pointer w-fit">
            <BsTwitter />
          </div>

          <div className="text-2xl mt-4  pr-4">
            <ul>
              {sidebarMenuItem.map((item) => (
                <li
                  key={item.title}
                  className="flex items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 cursor-pointer mt-2"
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-3">
              <button className="bg-[#1d9bf0] py-2 px-4 rounded-full w-full text-lg font-semibold">
                Tweeto
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-700 px-3 py-2 rounded-full ">
              {user && user.profileImageURL && (
                <Image
                  src={user.profileImageURL}
                  alt="user-image"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl">{user?.firstName}</h3>
                <h3 className="text-xl">{user?.lastName}</h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen  overflow-scroll scrollbar-none  border-gray-900">
          <div className="border border-r-0 border-l-0  border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-1 ">
                <Image
                  src={
                    user?.profileImageURL ||
                    "https://avatars.githubusercontent.com/u/59407093?v=4"
                  }
                  alt="user-avatar"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              </div>
              <div className="col-span-11">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                  placeholder="What's happening?"
                  rows={3}
                ></textarea>
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt
                    onClick={handleSelectImage}
                    className="text-xl "
                  />
                  <button
                    className="bg-[#1d9bf0] py-2 px-4 rounded-full  text-lg font-semibold"
                    onClick={handleCreateTweet}
                  >
                    Tweeto
                  </button>
                </div>
              </div>
            </div>
          </div>
          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        <div className="col-span-4 p-5">
          {!user && (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-2xl font-bold">New To Tweeto ? </h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

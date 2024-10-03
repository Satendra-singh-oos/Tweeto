"use client";

import { BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiBookmark, BiUser } from "react-icons/bi";
import { BsBell, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/component/FeedCard";
import { SlOptions } from "react-icons/sl";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "../lib/client/api";
import { verifyUserGoogleTokenQuery } from "../lib/graphql/query/user";

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

      console.log(verifyGoogleToken);
    },
    []
  );
  return (
    <div>
      <div className="grid grid-cols-12 h-screen px-48">
        <div className="col-span-3 pt-8 px-4">
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
        </div>
        <div className="col-span-5 border-r-[1px] border-l-[1px] h-screen  overflow-scroll scrollbar-none  border-gray-900">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4 p-5">
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-2xl font-bold">New To Tweeto ? </h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}

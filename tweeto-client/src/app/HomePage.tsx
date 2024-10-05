"use client";
import React from "react";
import TwitterLayout from "@/component/TwitterLayout";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/component/FeedCard";
import { useCallback, useState } from "react";
import { useCurrentUser } from "@/lib/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/lib/hooks/tweet";
import { Tweet } from "@/lib/gql/graphql";
const HomePage = () => {
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
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
  return (
    <div>
      <TwitterLayout>
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
                <BiImageAlt onClick={handleSelectImage} className="text-xl " />
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
      </TwitterLayout>
    </div>
  );
};

export default HomePage;

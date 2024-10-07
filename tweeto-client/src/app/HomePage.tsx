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
import { graphqlClient } from "@/lib/client/api";
import { getSignedURLForTweetQuery } from "@/lib/graphql/query/tweet";
import toast from "react-hot-toast";
import axios from "axios";
const HomePage = () => {
  const { user } = useCurrentUser();

  const { tweets = [] } = useGetAllTweets();
  const { mutateAsync } = useCreateTweet();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("Upload Completed", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);

    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

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

              {imageURL && (
                <Image
                  src={imageURL}
                  alt="Tweet-img"
                  width={300}
                  height={300}
                />
              )}
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

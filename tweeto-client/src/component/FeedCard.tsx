"use client";

import { Tweet } from "@/lib/gql/graphql";
import Image from "next/image";
import Link from "next/link";

import { AiOutlineHeart } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className="py-4 border-b-red-900 mt-4 ">
      <div className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
        <div className="h-14 w-14 shrink-0 cursor-pointer">
          <Link href={`/profile/${data.author?.id}`}>
            {data.author?.profileImageURL && (
              <Image
                src={data.author?.profileImageURL}
                alt="user-avatar"
                height={50}
                width={50}
                className="rounded-full"
              />
            )}
          </Link>
        </div>
        <div className="w-full">
          <h5 className="mb-1 flex items-center gap-x-2 cursor-pointer text-slate-400">
            <Link href={`/profile/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>
          <p className="mb-2 ml-2">{data.content}</p>
          {data.imageURL && (
            <Image
              src={data.imageURL}
              alt="tweet-image"
              width={400}
              height={400}
            />
          )}

          <div className="flex gap-4 justify-evenly items-center  mt-5">
            <div>
              <BsMessenger />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;

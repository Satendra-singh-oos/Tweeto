import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";

const FeedCard = () => {
  return (
    <div className="py-4 border-b-red-900 mt-4 ">
      <div className="flex gap-3 border-b border-gray-700 py-4 last:border-b-transparent">
        <div className="h-14 w-14 shrink-0 ">
          <Image
            src="https://avatars.githubusercontent.com/u/59407093?v=4"
            alt="user-avatar"
            height={50}
            width={50}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="w-full">
          <h5 className="mb-1 flex items-center gap-x-2">Satendra Singh</h5>
          <p className="mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam quo,
            iste dolores provident et tempora obcaecati tempore dolorem totam,
            modi saepe dignissimos libero amet, impedit dicta inventore porro
            aut ut?
          </p>
          <div className="flex gap-4 justify-evenly items-center ">
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

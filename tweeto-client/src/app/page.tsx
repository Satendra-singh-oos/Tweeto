import { BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiBookmark, BiUser } from "react-icons/bi";
import { BsBell, BsEnvelope } from "react-icons/bs";
import FeedCard from "@/component/FeedCard";

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
];

export default function Home() {
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
              <button className="bg-[#1d9bf0] p-4 rounded-full w-full text-lg font-semibold">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-5 border  border-r-[1px] border-l-[1px]   border-gray-900">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-4"></div>
      </div>
    </div>
  );
}

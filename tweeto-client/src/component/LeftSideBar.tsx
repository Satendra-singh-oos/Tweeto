"use client";

import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiBookmark, BiUser } from "react-icons/bi";
import { BsBell, BsEnvelope } from "react-icons/bs";

import { SlOptions } from "react-icons/sl";

import { useCurrentUser } from "@/lib/hooks/user";
import { useMemo } from "react";
import Link from "next/link";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const LeftSideBar = () => {
  const { user } = useCurrentUser();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      { title: "Home", icon: <BiHomeCircle />, link: "/" },
      { title: "Explore", icon: <BiHash />, link: "/" },
      { title: "Notification", icon: <BsBell />, link: "/" },
      { title: "Messages", icon: <BsEnvelope />, link: "/" },
      { title: "Bookmarks", icon: <BiBookmark />, link: "/" },
      { title: "Profile", icon: <BiUser />, link: `/profile/${user?.id}` },
      { title: "More Options", icon: <SlOptions />, link: "/" },
    ],
    [user?.id]
  );

  return (
    <div>
      {" "}
      <div className="text-3xl h-fit hover:bg-gray-800 rounded-full px-2 py-1 cursor-pointer w-fit">
        <BsTwitter />
      </div>
      <div className="text-2xl mt-4  pr-4">
        <ul>
          {sidebarMenuItems.map((item) => (
            <li key={item.title}>
              <Link
                className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-3 w-fit cursor-pointer mt-2"
                href={item.link}
              >
                <span className=" text-3xl">{item.icon}</span>
                <span className="hidden sm:inline">{item.title}</span>
              </Link>
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
  );
};

export default LeftSideBar;

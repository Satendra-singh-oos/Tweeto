"use client";

import LeftSideBar from "@/component/LeftSideBar";
import RightSideBar from "@/component/RightSideBar";

const TwitterLayout = ({ children }: any) => {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-12 h-screen ">
        <div className="col-span-3 pt-8 px-4 relative">
          <LeftSideBar />
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen  overflow-scroll scrollbar-none  border-gray-900">
          {children}
        </div>
        <div className="col-span-3 p-5">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;

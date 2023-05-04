import Link from "next/link";
import React from "react";
import { ICON, IconBrands } from "src/utils";
import LeftSideBar from "../LeftSideBar";

function WrapperList({ children }: { children: any }) {
  return (
    <>
      <div className="flex ">
        <div className="hidden md:block basis-1/5 px-4">
          <LeftSideBar />
        </div>
        <div className=" lg:basis-4/5 h-32">{children}</div>
        {/* <div className="hidden lg:block basis-1/5 h-32 bg-green-300"></div> */}
      </div>
    </>
  );
}

export default WrapperList;

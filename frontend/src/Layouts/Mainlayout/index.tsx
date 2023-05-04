import React from "react";
import { Header } from "src/components";
interface Props {
  children: any;
}
function Mainlayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className="mt-10 flex items-center justify-center mx-auto xl:mx-[200px] ">
        <div className="w-full mt-14">{children}</div>
      </div>
    </>
  );
}

export default Mainlayout;

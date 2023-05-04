import React from "react";
import { Header } from "src/components";
interface Props {
  children: any;
}
function LayoutBasis1({ children }: Props) {
  return (
    <>
      <Header />
      <div className="mt-[70px]">
        {children}

      </div>

    </>
  );
}

export default LayoutBasis1;

import React from "react";
import LayoutBasis1 from "src/Layouts/LayoutBasis1";
import Mainlayout from "src/Layouts/Mainlayout";
import { ICON, IconBrands } from "src/utils";
import { useSession, signIn as SignIN, signOut, getSession } from "next-auth/react";

interface ProviderProp {
  name: string;
  bgColor: string;
  Icon: JSX.Element;
}
function signin() {
  const Provider: ProviderProp[] = [
    {
      bgColor: "bg-black",
      Icon: <ICON className="text-white" icon={IconBrands.faGoogle} />,
      name: "google",
    },
    {
      bgColor: "bg-blue-300",
      Icon: <ICON className="text-white" icon={IconBrands.faFacebook} />,
      name: "facebook",
    },

  ];
  const handleOAuthSignIn = async (provider: string) => {
    localStorage.setItem("salstream_provider", provider)
    try {
      console.log("[PROVIDER]", provider);

      let result = await SignIN(provider, {
        redirect: true,
        callbackUrl: "/",
        addedParam: "My added parameter"
      })

      if (result?.error) {
        // console.log(session?.user, "USER AFTER LOGIN INNNNNNNNNN"); // full account information

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <LayoutBasis1>
        <div className="bg-gray-100  h-screen w-screen flex items-center justify-center">
          <div className="bg-white h-fit min-h-0 w-[45%] rounded-lg p-8">
            <h3 className="text-center ">Welcome to Dev.to community</h3>
            <h4 className="text-lg text-center">
              DEV Community is a community of 1,020,836 amazing developers
            </h4>

            {Provider.map((item: ProviderProp, index: number) => {
              return (
                <>
                  <div
                    onClick={() => {
                      handleOAuthSignIn(item.name)
                    }}
                    className={
                      "flex items-center justify-center w-full text-center h-12 my-3 rounded-lg" +
                      ` ${item.bgColor}`
                    }
                  >
                    {item.Icon}
                    <p className=" mx-3 text-white font-medium capitalize       ">
                      Continues with {item.name}
                    </p>
                  </div>
                </>
              );
            })}

            <legend className="  text-center">No Have account</legend>

            <h4 className="my-4">Email</h4>
            <input
              className="w-full outline-none border-gray-200 rounded-md"
              type="text"
            />
            <h4 className="my-4">Password</h4>
            <input
              className="w-full outline-none border-gray-200 rounded-md"
              type="text"
            />
            <div className="flex items-center my-4">
              <input type="checkbox" name="" id="" />
              <p className="font-medium text-xs mx-5 ">Remember me </p>
            </div>

            <div className="h-14 flex items"></div>
          </div>
        </div>
      </LayoutBasis1>
    </>
  );
}

export default signin;

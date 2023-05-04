import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ICON, IconRegular, IconSolid } from "src/utils";
import LeftSideBar from "../LeftSideBar";
import { getSession, signOut, useSession } from "next-auth/react";
interface UserInf {
  image: string;
  name: string;
  email: string;
  id: string
}
function Header() {
  const [isOpenNav, SetIsOpenNav] = React.useState(false);
  const [isOpenDrawer, SetIsOpenDrawer] = React.useState(false);
  const [dataUser, setDataUser] = React.useState<UserInf>({
    email: "",
    id: "",
    image: "",
    name: ""
  })
  React.useEffect(() => {
    async function FetchApi() {
      try {
        let result: any = await getSession();
        console.log(result?.user?.id, "User Id")
        setDataUser(result.user)
      } catch (error) {

      }
    }
    FetchApi()
  }, [])

  return (
    <>
      <div className=" px-2 sm:px-0 bg-white shadow-md transition-all py-2 fixed left-0 right-0 top-0 z-[2]">
        {isOpenDrawer && (
          <>
            <div className=" bg-white px-5 absolute z-[2] top-0 bottom-0 left-0 h-screen  overflow-y-auto ">
              <div className="w-screen">
                {/* <div className="flex justify-end  p-5">
              <ICON className="" icon={IconSolid.faTimes} />
            </div> */}
                <LeftSideBar />
              </div>
            </div>
          </>
        )}
        <div className="flex items-center justify-between xl:mx-[200px] min-h-[50px] ">
          <div className="hidden md:flex items-center border-[2px] border-[#D4D4D4] px-2 py-1 rounded-md">
            <Link href={`/`}>
              <LazyLoadImage
                src="https://cdn.dribbble.com/userupload/4784370/file/original-1fd139cd70b879042db53b45413b5c1d.jpg?compress=1&resize=1024x768"
                className="h-full w-[40px]"
              />
            </Link>
            <input
              className="outline-none border-none"
              type="text"
              placeholder="Search"
            />
            <ICON icon={IconSolid.faSearch} />
          </div>
          <ICON className="md:hidden" icon={IconSolid.faBars} />
          <div className="flex items-center relative">
            <ICON className="md:hidden" icon={IconSolid.faSearch} />

            <Link
              href={`/new`}
              className="md:flex hidden hover:bg-blue-600 hover:text-white hover:font-medium  border-[2px] border-[#D4D4D4] px-3 py-2 rounded-md items-center justify-center"
            >
              <p>Create Post</p>
            </Link>
            <ICON className="mx-3 text-xl" icon={IconRegular.faBell} />
            <img
              onClick={() => {
                SetIsOpenNav(!isOpenNav);
              }}
              className="w-10 h-10 rounded-full"
              src={dataUser.image}
              alt="Rounded avatar"
            />
            {isOpenNav && dataUser.id != "" && (
              <ul className="list-none shadow-md rounded-md h-[300px] w-screen  sm:w-[250px] bg-white absolute z-[1] top-[calc(100%_+_10px)] right-0 px-2 py-1">
                <li className="p-2 border-b-[2px] border-[#D4D4D4]">
                  <h3 className="font-medium text-sm whitespace-nowrap">
                    {dataUser.name}
                  </h3>
                  <h4 className="font-light font-xs">@giathuankaren</h4>
                </li>
                <Link href={`/user/${dataUser.id}`}>
                  <li className="p-2">Dashboard</li>
                </Link>
                <Link href={`/new`}>
                  <li className="p-2">Create Post</li>
                </Link>
                <li className="p-2">Reading List</li>
                <li className="p-2">Settings</li>
                <li onClick={() => {
                  signOut()
                }} className="p-2 border-t-[2px] border-[#D4D4D4]">
                  Sign Out
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

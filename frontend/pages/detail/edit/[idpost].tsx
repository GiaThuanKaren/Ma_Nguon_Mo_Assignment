
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Mainlayout from 'src/Layouts/Mainlayout';
import { PostItemInf } from 'src/Model';
import { DeletePost, GetDetailPost, UpdatePost } from 'src/service/api';
import { ICON, IconRegular, IconSolid } from 'src/utils';
const Editor = dynamic(() => import("src/components/Editor/index"), { ssr: false });

function EditPage() {
    const [isTop, setisTop] = React.useState(false);
    const { data: session, status } = useSession()

    const { idpost } = useRouter().query
    const [data, setData] = React.useState<PostItemInf>()
    const [title, setTitle] = React.useState<string>("")
    const [ImageUrl, SetImageurl] = React.useState<{
        url: string;
        filesImage: File
    }>();
    const [dataEdit, setDataEdit] = React.useState<{
        image: string;
        title: string;
        body: any,
        fileImage: File
    }>()
    const [bodyText, setBodyText] = React.useState("")
    console.log(idpost, "ADD")

    const HandleUpdate = async function () {
        try {
            let result = await UpdatePost(data?._id.$oid as string, data?.title as string, data?.body, data?.cover_image)

        } catch (error) {

        }
    }
    const HandleSetData = function (key: "image" | "title" | "cover_image" | "body", value: any) {

    }

    React.useEffect(() => {
        window.addEventListener("scroll", (e) => {
            console.log(window.scrollY);
            if (Math.abs(window.scrollY) == 0) {
                setisTop(true);
            } else setisTop(false);
        });
        async function FetchApi() {
            try {
                let result = await GetDetailPost(idpost as string);

                console.log(result["article"])
                setBodyText(result["article"].body)
                setData(result["article"])
            } catch (error) {

            }
        }
        let users: any = session?.user
        console.log(users?.id)
        if (idpost) {
            FetchApi()
            console.log(idpost)
        } else {
            console.log("Nop")
        }
    }, [idpost]);


    return (
        <>
            <Mainlayout>
                <div className='w-full h-[100px]  mb-7 flex items-center'>
                    <div className='flex items-center'>
                        <p
                            className="md:flex hidden hover:cursor-pointer hover:bg-blue-600 hover:text-white hover:font-medium  border-[2px] border-[#D4D4D4] px-3 py-2 rounded-md items-center justify-center"

                        >
                            Save
                        </p>
                        <p
                            onClick={() => {
                                DeletePost(data?._id.$oid as string)
                            }}
                            className="mx-3 md:flex hidden hover:cursor-pointer hover:bg-red-400 bg-red-600 text-white hover:font-medium  border-[2px] border-[#D4D4D4] px-3 py-2 rounded-md items-center justify-center"

                        >
                            Delete
                        </p>
                    </div>

                </div>
                <div className="flex min-h-screen relative ">
                    <div className={`${isTop ? "" : "  "}` + "basis-1/12 "}>
                        <div
                            className={
                                `${isTop ? "" : ""}` +
                                "w-full flex flex-col items-center hover:cursor-pointer"
                            }
                        >
                            <div className="my-4">
                                <ICON icon={IconRegular.faHeart} />
                                <p>20</p>
                            </div>
                            <div className="my-4">
                                <ICON icon={IconRegular.faComment} />
                                <p>20</p>
                            </div>
                            <div className="my-4">
                                <ICON icon={IconRegular.faBookmark} />
                                <p>20</p>
                            </div>
                            <div className="my-4">
                                <ICON icon={IconSolid.faEllipsis} />
                            </div>
                        </div>
                    </div>


                    <div className={"basis-10/12 " + `${isTop ? "" : ""}`}>
                        {/* Image Cover */}
                        <div className="h-52 w-full overflow-hidden mb-3 ">
                            <LazyLoadImage
                                // className=" "
                                src={`https://drive.google.com/uc?id=${data?.cover_image as string}&export=download`}

                            />
                        </div>
                        {/* Contend Page */}
                        <div className="px-4">
                            <div className="flex">
                                <img
                                    onClick={() => { }}
                                    className="w-10 h-10 rounded-full mr-3"
                                    src={data?.user[0].image}
                                    alt="Rounded avatar"
                                />
                                <div>
                                    <h3 className="font-medium text-base whitespace-nowrap">
                                        {data?.user[0].name}
                                    </h3>
                                    <p className="text-xs">
                                        Posted on Feb 16 • Originally published at
                                        codebase.substack.com
                                    </p>
                                </div>
                            </div>
                            <input value={data?.title} onChange={(e) => {
                                setTitle(e.target.value)
                            }} type="text" placeholder="Default Title" className="w-full outline-none border-none font-bold text-4xl my-3" />
                            {/* <h1 className="font-bold text-4xl my-3">
                                {data?.title}
                            </h1> */}
                            <Editor onChange={(text1: any) => {
                                setBodyText(text1)
                                console.log("text comming", text1)
                            }} value={bodyText} />
                            {/* <div className="mt-5 mb-3" dangerouslySetInnerHTML={{
                                __html: data?.body as string
                            }}>

                            </div> */}

                            {/* <div className="min-h-[200px] w-full bg-ưhite rounded-xl">
                                <div className="flex  py-2 items-center justify-between">
                                    <div className="flex items-center">
                                        <LazyLoadImage
                                            onClick={() => { }}
                                            className="w-10 h-10 rounded-full mr-3"
                                            src={data?.user[0].image}
                                            alt="Rounded avatar"
                                        />
                                        <div>
                                            <h3 className="font-medium text-base whitespace-nowrap">
                                                {data?.user[0].name}
                                            </h3>
                                            <p className="text-xs">
                                                Posted on Feb 16 • Originally published at
                                                codebase.substack.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center px-4  py-2  bg-blue-600 rounded-lg   ">
                                        <p className="text-white font-medium">Follow</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <ListComment idPost={idpage as string} /> */}
                        {/* <CommentInput idPost={data?._id.$oid as string} /> */}



                    </div>
                    {/* <div className={`${isTop ? "" : " "}` + "basis-2/12"}>
          <p>shjdljfdl</p>
        </div> */}
                </div>
            </Mainlayout>
        </>
    )
}

export default EditPage
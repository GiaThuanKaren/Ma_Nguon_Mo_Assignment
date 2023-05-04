import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Mainlayout from "src/Layouts/Mainlayout";
import { PostItemInf } from "src/Model";
import { CommentInput, ListComment } from "src/components/Comment";
import { GetDetailPost } from "src/service/api";
import { FormatDate, ICON, IconRegular, IconSolid } from "src/utils";

interface Props {
  paramsUrl: string
}
function DetailPage({ paramsUrl }: Props) {
  const [isTop, setisTop] = React.useState(false);
  const { idpage } = useRouter().query
  const [data, setData] = React.useState<PostItemInf>()

  console.log(idpage, "ADD")
  React.useEffect(() => {
    window.addEventListener("scroll", (e) => {
      console.log(window.scrollY);
      if (Math.abs(window.scrollY) == 0) {
        setisTop(true);
      } else setisTop(false);
    });
    async function FetchApi() {
      try {
        let result = await GetDetailPost(idpage as string);
        console.log(result["article"])
        setData(result["article"])
      } catch (error) {

      }
    }
    if (idpage) {
      FetchApi()
      console.log(idpage)
    } else {
      console.log("Nop")
    }
  }, [idpage]);
  return (
    <Mainlayout>
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
              className="h-full w-full object-cover object-center "
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
                  Posted on {FormatDate(data?.created_at.$date as string)} • Originally published at
                  codebase.substack.com
                </p>
              </div>
            </div>
            <h1 className="font-bold text-4xl my-3">
              {data?.title}
            </h1>

            <div className="mt-5 mb-3" dangerouslySetInnerHTML={{
              __html: data?.body as string
            }}>

            </div>

            <div className="min-h-[200px] w-full bg-ưhite rounded-xl">
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
            </div>
          </div>
          <ListComment idPost={idpage as string} />
          {/* <CommentInput idPost={data?._id.$oid as string} /> */}



        </div>
        {/* <div className={`${isTop ? "" : " "}` + "basis-2/12"}>
          <p>shjdljfdl</p>
        </div> */}
      </div>
    </Mainlayout>
  );
}


export const getServerSide: GetServerSideProps = async function (params) {
  let param = params.query.idpage
  return {
    props: {
      paramsUrl: param
    }
  }
}






export default DetailPage;

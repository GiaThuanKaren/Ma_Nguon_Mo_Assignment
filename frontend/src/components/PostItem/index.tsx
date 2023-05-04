import Link from "next/link";
import React from "react";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import { ICON, IconRegular, IconSolid, readingTime } from "src/utils";
import { PostItemInf } from "src/Model";
import { useRouter } from "next/router";
function PostItem({ optionAdmin, _id, body, bookmarks, comments_count, cover_image, created_at, edited_at, likes, published, title, user }: PostItemInf) {
  const { push } = useRouter()
  const userAuthor = user[0];
  console.log(_id.$oid)
  return (
    <>
      <div onClick={() => {
        push(`/detail/${_id.$oid}`)
      }} className="my-2 w-full min-h-[100px]  border-[2px] border-[#ececec] rounded-md shadow-sm p-4">
        <div className="w-full h-[300px]">
          <LazyLoadImage
            // effect="blur"
            className=" w-full h-full object-center object-contain"
            src={`https://drive.google.com/uc?id=${cover_image as string}&export=download`}

            alt=""
          />
        </div>

        <Link href={"/user/thuan"}>
          <div className="flex items-center mt-3">
            <img
              className="w-10 h-10 rounded-full"
              src={userAuthor.image}
            />
            <p className="mx-3 font-medium">{userAuthor.name}</p>
          </div>
        </Link>
        <div className="flex justify-center w-full">
          <div className="w-[90%] my-2">
            <p className="font-medium text-xl">
              {title}
            </p>
            <div className="flex items-center justify-between my-2">
              <div className="flex items-center">
                <div className="flex items-center">
                  <ICON icon={IconRegular.faHeart} />
                  <p className="text-xs mx-3">{likes.length} </p>
                </div>
                <div className="flex items-center mx-3">
                  <ICON icon={IconRegular.faComment} />
                  <p className="text-xs mx-3">{comments_count} Comment</p>
                </div>
              </div>

              <div className="flex items-center">
                <p className="text-xs mx-3">{readingTime(body)} min read</p>
                <ICON icon={IconRegular.faBookmark} />
                {
                  optionAdmin &&
                  <ICON onClick={(e) => {
                    e.stopPropagation();
                    push(`/detail/edit/${_id.$oid}`)
                  }} className="ml-4 p-5 hover:cursor-pointer" icon={IconSolid.faEllipsisV} />
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostItem;



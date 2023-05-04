import { useRouter } from "next/router";
import React from "react"
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CommentInf } from "src/Model";
import { GetAllComment, InsertNewComment } from "src/service/api";
import { ShowToastify } from "src/utils";
interface Props {
  idPost: string;
  parentID?: string;
}


export const CommentInput = function ({ idPost, parentID }: Props) {
  const [text, settext] = React.useState<string>("");
  const InputCommentEle = React.useRef(null);
  const handleComment = async function (parententIdComment: string) {
    try {
      const result = await InsertNewComment(idPost as string, text, parententIdComment)
    } catch (error) {
      throw error
    }
    finally {
      settext("")
    }
  }

  return <>
    <div className="h-[70px] px-2 flex items-center justify-between border-t border-[#EFEFEF] py-[8px]">
      {/* <div>
        <svg
          aria-label="Biểu tượng cảm xúc"
          className="_ab6-"
          color="#262626"
          fill="#262626"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M15.83 10.997a1.167 1.167 0 1 0 1.167 1.167 1.167 1.167 0 0 0-1.167-1.167Zm-6.5 1.167a1.167 1.167 0 1 0-1.166 1.167 1.167 1.167 0 0 0 1.166-1.167Zm5.163 3.24a3.406 3.406 0 0 1-4.982.007 1 1 0 1 0-1.557 1.256 5.397 5.397 0 0 0 8.09 0 1 1 0 0 0-1.55-1.263ZM12 .503a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12 .503Zm0 21a9.5 9.5 0 1 1 9.5-9.5 9.51 9.51 0 0 1-9.5 9.5Z"></path>
        </svg>
      </div> */}
      <input
        value={text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          settext(e.target.value);
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.code == "Enter") {
            console.log([InputCommentEle.current]);
            handleComment(parentID as string)
          }
        }}
        ref={InputCommentEle}
        type="text"
        className="bg-transparent flex-1 px-3 outline-none break-words "
        placeholder="Thêm bình luận"
      />
      <p
        className={`font-medium ${text === "" ? "text-[#B6DCFF]" : "text-[#0396F6]"
          }  `}
      >
        Đăng
      </p>
    </div>
  </>
}


export const ReplyComment = function ({ _id, author, body, date, isPositive, likes, parent_id, parent_post, replies }: CommentInf) {
  const [openReplyInput, setopenReplyInput] = React.useState(false);
  const [openReplyComment, setopenReplyComment] = React.useState(false);
  const [ArrCommentReply, setArrCommentReply] = React.useState<any>([]);

  const HandleLoadMoreComment = async function (parentID: string,
    Currstate: boolean) {
    try {
      if (Currstate) {
        setopenReplyComment(false)
      } else {


        let result = await GetAllComment(parent_post.$oid, parentID)
        // let result = await getAllReplied(postId, _id)
        // console.log(result)

        setArrCommentReply(result?.comment);
        setopenReplyComment(true);
      }
    } catch (error) {
      throw error
    }
  }
  return <>
    <div className="flex py-3 my-1 mr-2 ">
      <div className="h-10 w-10 rounded-full overflow-hidden mr-5 mt-1 mb-3">
        <LazyLoadImage
          className="h-full w-full object-cover"
          src={author[0].image}
        />
      </div>
      <div>
        <p className="text-black text-base font-medium">{body} </p>
        <p className="text-white text-xs font-light">

        </p>
        <p
          onClick={() => {
            setopenReplyInput(!openReplyInput);
          }}
          className="  font-medium text-xs text-black my-1"
        >
          {openReplyInput ? "Cancel" : "Reply"}
        </p>
      </div>
    </div>
    {
      openReplyInput &&
      <CommentInput idPost={parent_post.$oid} parentID={_id.$oid} />
    }
    <div className="pl-3">
      {
        replies.length > 0 && <>
          <p onClick={() => {
            HandleLoadMoreComment(_id.$oid, openReplyComment)
          }} className='text-black font-medium'> {openReplyComment ? "Hide" : "View More"}</p>
        </>
      }
      {
        openReplyComment && replies.length > 0 && ArrCommentReply.map((item: CommentInf, index: number) => {
          return <>
            <ReplyComment key={index} {...item} />
          </>
        })
      }
    </div>


  </>
}


export const ListComment = function ({ idPost }: {
  idPost: string
}) {
  const [dataComment, setDataComment] = React.useState<CommentInf[]>([]);

  React.useEffect(() => {
    async function FetchApi() {
      try {
        let result = await GetAllComment(idPost, "");
        setDataComment(result["comment"])
      } catch (error) {

      }
    }
    if (idPost) {
      FetchApi()
    }
  }, [idPost])
  return <>
    <CommentInput idPost={idPost} parentID={""} />
    {
      dataComment.map((item: CommentInf, index: number) => {
        return <>
          <ReplyComment {...item} />
        </>
      })
    }
  </>
}
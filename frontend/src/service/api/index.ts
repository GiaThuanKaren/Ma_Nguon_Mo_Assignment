import axios from "axios";
import { MSG, ShowToastify } from "src/utils";

const BASE_URL_Dev: string = "http://127.0.0.1:5000/api/v1";
const BASE_URL_PRO: string = "https://devto.onrender.com/api/v1"

export const InsertNewComment = async function (_idPost: string, body: any, _idParent: string = "") {
  let userId = localStorage.getItem("user")
  try {
    let result = await axios.post(`${BASE_URL_Dev}/createComment`, {
      "_idPost": _idPost,
      "body": body,
      "userId": JSON.parse(userId as string),

      "_idParent": _idParent
    })
    ShowToastify("SUCESS", "Thanks Your Feedback")
  } catch (e) {
    ShowToastify("ERROR", "Opps Something Went Wrong , Pleasy Refresh Your Page")
  }
};






export const GetAllComment = async function (idPost: string, idParent: string = "") {
  try {
    const result = await axios.post(`${BASE_URL_Dev}/getAllComment`, {
      "_idPost": idPost,
      "_idParent": idParent
    })
    return result.data

  } catch (error) {
    ShowToastify("ERROR")
  }
}


export const CreateNewPost = async function (title: string, body: any, cover_image: File) {
  try {
    let formdata = new FormData()
    formdata.append("tenfile", cover_image)

    let resultImageUpload = await axios.post("https://instagram-backend-gia-thuan.vercel.app/api/upload/upload_single", formdata, {
      headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
    })

    let userId = localStorage.getItem("user")
    // return MSG("Done", resultImageUpload.data)
    let result = await axios.post(BASE_URL_Dev + "/createArticle", {
      "body": body,
      "title": title,
      "cover_image": resultImageUpload.data.data,
      "userId": JSON.parse(userId as string)
    })
    ShowToastify("SUCESS", "Create Post Done")
    return MSG("Done", result.data, null)
  } catch (e) {
    ShowToastify("ERROR")

  }
}


export const DeletePost = async function (idPost: string) {
  try {
    let result = await axios.delete(`${BASE_URL_Dev}/deleteArticle/${idPost}`)
    ShowToastify("SUCESS", "Post Deleted")
  } catch (error) {
    ShowToastify("ERROR")
  }
}

export const UpdatePost = async function (idPost: string, title: string, body: any, OldImage: string, FileImage: any = null) {
  try {
    let imageLink: string = OldImage;
    if (FileImage) {
      let formdata = new FormData()
      formdata.append("tenfile", FileImage)
      let resultImageUpload = await axios.post("https://instagram-backend-gia-thuan.vercel.app/api/upload/upload_single", formdata, {
        headers: { "Content-Type": "multipart/form-data", 'Access-Control-Allow-Origin': '*' },
      })
      imageLink = resultImageUpload.data.data
    }
    let result = await axios.put(`${BASE_URL_Dev}/updateArticle/${idPost}`,
      {
        "title": title,
        "body": body,
        "cover_image": imageLink,

      },{
        headers: {  'Access-Control-Allow-Origin': '*' },
      })
    ShowToastify("SUCESS", "Update Sucessfully")
  } catch (error) {
    ShowToastify("ERROR")
  }
}


export const GetAllPost = async function () {
  try {
    let result = await axios.get(`${BASE_URL_Dev}/getAllArticles`)
    return result.data
  } catch (error) {
    ShowToastify("ERROR")
  }
}



export const GetDetailPost = async function (id: string) {
  try {
    let result = await axios.get(`${BASE_URL_Dev}/getArticle/${id}`)
    return result.data
  } catch (error) {
    ShowToastify("ERROR")
  }
}


export const GetAllPostByIdUser = async function (id: string) {
  try {
    let result = await axios.post(`${BASE_URL_Dev}/getAllArticlesFromUserById/${id}`)
    return result.data
  } catch (error) {
    ShowToastify("ERROR")
  }
}      

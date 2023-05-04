import { FontAwesomeIcon as ICON } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import * as IconBrands from "@fortawesome/free-brands-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import moment from "moment";
export { ICON, IconBrands, IconRegular, IconSolid };
export const MSG = function (msg: string, data: any = null, other: any = null) {
    return {
        msg,
        data, other
    }
}


export const ShowToastify = function (type: "ERROR" | "SUCESS", msg?: string) {
    switch (type) {
        case "SUCESS": {
            toast(msg ? msg : 'Sucessfully')
            break
        }
        case "ERROR": {
            toast(msg ? msg : 'Oops , Something went error , Please try again or refresh the page')
            break
        }
    }

}


export const readingTime = function (textBody: string) {
    const wpm = 225;
    const words = textBody.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time

}


export const FormatDate = function (stringDate: string, formatType: string = "MMM Do YY") {
    return moment(stringDate).format(formatType)

}
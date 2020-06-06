import dayjs from "dayjs";
import Axios from "axios";

const FETCH_URL = "http://localhost:4000/ogp/";

export const shortenUrl = (longUrl) => {
  const result = longUrl
    .split("/")
    .filter((fragment) => fragment.includes("."))[0]; // console.log(result);

  return result;
};

export const convertDate = (date) => dayjs(date).format("MMM DD, YYYY ");

// Credit: https://www.tutorialspoint.com/How-to-validate-URL-address-in-JavaScript

const isUrl = (url) => {
  const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return pattern.test(url);
};

const getTags = (array) => [
  ...new Set(array.filter((word) => word.startsWith("#") && word.slice(1))),
];

const getUrl = (array) => array.filter((sentence) => isUrl(sentence))[0];

export const analizeMemo = (string) => {
  const object = {};

  object.array = string.split(/\s+/);
  object.tags = () => getTags(object.array);
  object.url = () => getUrl(object.array);

  return object;
};

export const fetchOg = async (uri) => {
  try {
    const queryUrl = `${FETCH_URL}${encodeURIComponent(uri)}`;
    const res = await Axios.get(queryUrl);
    const {
      
      ogUrl = "",
      ogImage = "",
      ogTitle = "",
      ogDescription = "",
    } = res.data.data;
    if (res.data.success) {
       
      return {
        title: ogTitle,
        url: ogUrl,
        imageUrl: ogImage.url ? ogImage.url : "",
        description: ogDescription,
        isValid: true
      };
    } else {
      return { isValid: false };
    }
  } catch (error) {
    return { error: error.code };
  }
};

export const getNameFromId = (list, id) => {
  const user = list.find((user) => user.userId === id);
  return user.displayName;
};

export const getNamesFromIds = (userArray, sharedArray) => {

  const result = sharedArray.map((id) => getNameFromId(userArray, id));
  return result;
};

export const getPostOwnerName = (list, id ) => getNameFromId(list, id);



export const getSharedUserArray = (userList, shareWith) => {
  if (shareWith.includes('public')) return ['public']
  else if (shareWith.includes('me')) return ['me']
  else return getNamesFromIds(userList, shareWith)
}


export const dates = ( statusDates ) => {
  
  const createdDate = dayjs(statusDates[0].date).format("MMM DD, YYYY");
  const currentStatus = statusDates.slice(-1);

  return {
    createdDate,
    currentStatus
  }
}


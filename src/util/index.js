import dayjs from "dayjs";
import Axios from 'axios';

const FETCH_URL = 'http://localhost:4000/ogp/'

export const shortenUrl = (longUrl) => {
    const result = longUrl
      .split("/")
      .filter((fragment) => fragment.includes("."))[0];    // console.log(result);

    return result;
  };


export const convertDate = (date) => dayjs(date).format("MMM DD, YYYY ");
  

// Credit: https://www.tutorialspoint.com/How-to-validate-URL-address-in-JavaScript

export const isUrl = (url) => {
    const pattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    return pattern.test(url);

}

export const isTag = (sentence) => sentence.startsWith('#');


export const fetchOg = (uri) => {

    
        const enocodedUrl = encodeURIComponent(uri)
        Axios.get(`${FETCH_URL}${enocodedUrl}`)
            .then ( res => {

                //console.log(res.data)
                if (res.data.error) {
                    //console.log('error message:' + res.data.requestUrl);
                    return ({
                        title: res.data.error,
                        imageUrl: '',
                        description: '',
                        url: res.data.requestUrl,
                        isValid: false
                        
                    })
                } else {        
                    const {ogUrl, ogImage, ogTitle, ogDescription} = res.data;
                            return ({
                        title: ogTitle,
                        imageUrl: ogImage.url,
                        description: ogDescription,
                        url: ogUrl,
                        isValid: true
                    })
        
                }
                

            } )
        


    
  }



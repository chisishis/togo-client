import Axios from 'axios';



const fetchMeta = async(uri) => {

    try {
        const enocodedUrl = encodeURIComponent(uri)
        const res = await Axios.get(`http://localhost:4000/ogp/${enocodedUrl}`);

        const {ogUrl, ogImage, ogTitle, ogDescription} = res.data;

        return ({
            title: ogTitle,
            imageUrl: ogImage.url,
            description: ogDescription,
            url: ogUrl
        })


    } catch(e) {
        console.error(e)
    }

  }

  export default fetchMeta
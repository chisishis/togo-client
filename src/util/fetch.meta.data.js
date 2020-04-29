import Axios from 'axios';



const fetchMeta = (uri) => {

    
        const enocodedUrl = encodeURIComponent(uri)
        Axios.get(`http://localhost:4000/ogp/${enocodedUrl}`)
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

  export default fetchMeta
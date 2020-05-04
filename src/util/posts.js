import Axios from "axios";

const convertFilterToString = (filterObject) => {
    const filterMap = {
      all: "a",
      created: "c",
      planned: "p",
      cancelled: "x",
      postponed: "n",
      completed: "o",
    };
  
    let filteredString = "";
  
    for (let [key, value] of Object.entries(filterObject)) {
      if (value) filteredString += filterMap[key];
    }
    console.log(filteredString);
    return filteredString;
  };


const baseUrl = "https://us-central1-togo-b7cd6.cloudfunctions.net/app";

const compositeHeader = (token) => ({headers: { Authorization: `Bearer ${token}`}})

export const deletePost = (id,token) => {
    
    Axios.delete(
        `${baseUrl}/post/${id}`,
        compositeHeader(token)
      )
        .then((res) => {
          // getPosts({ all: true });
          console.log(res.data);
        })
        .catch((e) => {
          //setErrors(e.response.data);
          console.log(e.response.data);
        });
}


export const getPosts = (filterObject, fetchHandler) => {

    
    Axios.get(`${baseUrl}/posts/${convertFilterToString(filterObject)}`)
    .then((result) => {
       fetchHandler(result.data)      
      //return result.data;      
    })
    .catch((error) => {        
        return error 
    }
    )

}

export const postNew = (userData, token) => {
        
    Axios.post(
      `${baseUrl}/post`,
      userData,
      compositeHeader(token)
    )
      .then((res) => {
        // getPosts({ all: true });
        console.log(res.data);
      })
      .catch((e) => {
        //setErrors(e.response.data);
        console.log(e.response.data);
      });
}
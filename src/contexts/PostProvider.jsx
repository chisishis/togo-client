
import React, {useContect, useState, useContext} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

const postContext = React.createContext();


// Hook for child components
export const usePost = () => useContext(postContext)

export const PostProvider = ({ children, postContent }) => {

    const post = useProvidePost(postContent);

    return (
        <postContext.Provider value={post}>{children}</postContext.Provider>
    )
}

const useProvidePost = (postContent) => {
    const [post, setPost] = useState(postContent)

    return {
        post
    }
}

PostProvider.propTypes = {
    children : PropTypes.node.isRequired
}

export default PostProvider

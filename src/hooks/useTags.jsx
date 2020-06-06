import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux'

const useTags = () => {

    const [tags, setTags] = useState();

    useEffect ( () => {
        setTags(useSelector(state => state.))
    })

    return (
        <div>
            
        </div>
    )
}

useTags.propTypes = {

}

export default useTags

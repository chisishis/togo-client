import React from 'react'
import Button from "@material-ui/core/Button";
/**
 * Renders Cancel Button with primary color and a given text
 * 
 * @param text - Text to be rendered in button component 
 */
const CancelButton = ({text, clickHandler}) => {
    return (
        <Button
          type="button"          
          color="primary"       
          onClick={clickHandler}     
        >
          {text}
        </Button>
    )
}


export default CancelButton

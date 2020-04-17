import React from 'react'
import { makeStyles } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey'; 
import Button from '@material-ui/core/Button';



const useStyles = makeStyles( theme => ({
    tag: {

        color: blueGrey[500],
        backgroundColor: 'none',
        "&:hover": {
            color: blueGrey[700],           
            "@media (hover : none)" : {
                color: blueGrey[700], 
            }
        },
        margin: theme.spacing(1)
       
    }
}))

const Tag = ({tagItem}) => {
    const classes = useStyles();
    return (
        <Button size='small' key={tagItem} className={classes.tag}>{tagItem}</Button>
    )

}

export default Tag;
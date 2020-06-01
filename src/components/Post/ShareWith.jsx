import React from "react";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";


const ShareWith = ({ sharedUserArray }) => {   

    const trimmedArray = sharedUserArray.join(', ')
    return <Typography variant='body2' color='textSecondary' align='right' children={`Shared With: ${trimmedArray}`}/>;
};

ShareWith.protoType = {
  sharedNames: PropTypes.array.isRequired,
};

export default ShareWith;

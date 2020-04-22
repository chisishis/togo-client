import React from "react";

import Typography from "@material-ui/core/Typography";
import { useAuth } from "../../contexts/user.provider";

const Greetings = () => {  
  const userAuth = useAuth();
  const userName = userAuth.user.userName;

  return (
    <Typography variant="body1">
      Howdy {userName ? userName : "Stranger"}
    </Typography>
  );
};

export default Greetings;

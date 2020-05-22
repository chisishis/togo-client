//  Customized theme for MUI
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const theme = {
  palette: {
    primary: {
      light: blue[400],
      main: blue[600],
      dark: blue[900],
    },
    secondary: {
      light: "#ff5c8d",
      main: "#d81b60",
      dark: "#a00037",
    },
  },
  overrides: {
    MuiCardActionArea : {
      root: {
        backgroundColor: "#f8f8f8",
      }
      
    }

  }
  
  
};

export default theme;

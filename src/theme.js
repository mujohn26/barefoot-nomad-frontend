import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#0094FF"
    },
    secondary: {
      main: '#E10050',
    }
  },
  typography: {
    fontFamily: "Roboto"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 760,
      lg: 900,
      xl: 1200
    }
  }
});

const theme = {
  ...defaultTheme,
  overrides: {
    MuiTypography: {
      h3: {
        color: "#0094FF"
      },
      body2: {
        fontSize: "13px"
      },
      subtitle1: {
        fontSize: "10px"
      }
    }
  }
};

export default theme;

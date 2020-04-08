export const Styles = theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(1)
  },
  display: {
    display: "flex"
  },
  cancelButton: {
    marginTop: "10px",
    marginLeft: "195px",
    color: "white",
    ["@media (max-width:780px)"]: {
      marginLeft: "-205px"
    },
    ["@media (max-width:320px)"]: {
      marginLeft: "-200px"
    },
    ["@media (min-width:769px) and (max-width:1024px) "]: {
      marginLeft: "50px"
    }
  },
  updateButton: {
    marginTop: "10px",
    marginLeft: "200px",
    ["@media (max-width:780px)"]: {
      marginLeft: "-150px"
    },
    ["@media (max-width:380px)"]: {
      marginLeft: "-130px"
    },
    ["@media (max-width:320px)"]: {
      marginLeft: "-120px"
    },
    ["@media (min-width:769px) and (max-width:1024px)"]: {
      marginLeft: "90px"
    }
  },
  Snackbar: {
    width: "520px",
    margin: "45% 40%",
    ["@media (max-width:1024px)"]: {
      marginTop: "120px",
      marginBottom: "620px"
    },
    ["@media (max-width:780px)"]: {
      marginLeft: "120px",
      marginBottom: "620px"
    },
    ["@media (max-width:500px)"]: {
      marginLeft: "100px",
      marginBottom: "640px",
      width: "350px"
    },
    ["@media (max-width:400px)"]: {
      marginLeft: "40px",
      marginBottom: "640px",
      width: "350px"
    },
    ["@media (max-width:350px)"]: {
      marginLeft: "0px",
      marginBottom: "640px",
      width: "350px"
    }
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "80%",
    height: "2.5rem",
    ["@media (max-width:780px)"]: {
      position: "relative",
      bottom: 0,
      marginLeft: "9vw"
    }
  }
});

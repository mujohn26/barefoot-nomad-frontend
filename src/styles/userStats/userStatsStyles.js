export const Styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    width: "496px",
    height: "233px",
    boxShadow: "0.2px 0.2px 6px rgba(0, 0, 0, 0.1)",
    ["@media (max-width:450px)"]: {
      width: "90vw"
    }
  },
  img: {
    padding: "8px"
  },
  grid: {
    width: "40%",
    margin: "0px auto",
    ["@media (max-width:430px)"]: {
      padding: "10px",
      width: "100%",
      margin: "0px auto"
    }
  },
  title: {
    marginTop: "50px",
    marginLeft: "68px",
    fontWeight: 300,
    fontSize: "24px",
    lineHeight: "28px",
    color: "#616161",
    ["@media (max-width:430px)"]: {
      marginLeft: "2vw"
    }
  },
  span: {
    fontWeight: "bold",
    fontSize: "26px",
    lineHeight: "42px",
    color: "#0094FF"
  },
  detailsType: {
    marginTop: "15px",
    textAlign: "center",
    fontWeight: 300,
    fontSize: "24px",
    lineHeight: "28px",
    color: "#616161"
  },
  count: {
    fontWeight: "normal",
    fontSize: "42px",
    textAlign: "center",
    lineHeight: "24px",
    color: "#0094FF"
  }
});

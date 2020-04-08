import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Paper from "@material-ui/core/Paper";
import oneway from "../assets/oneway.png";
import returns from "../assets/return.png";
import multi from "../assets/multi.png";
import { getStats } from "../actions/tripStatsActions";
import Footer from "./common/footer";
import { Styles } from "../styles/userStats/userStatsStyles";

const tripIcons = {
  "one way": oneway,
  "multi-city": multi,
  "round trip": returns
};
const useStyles = makeStyles(Styles);

export const mapThroughTripTypes = details => {
  let fillTrips = "";
  details.map(detail => {
    fillTrips += detail.tripType;
  });
  const tripTypes = ["one way", "round trip", "multi-city"];
  tripTypes.map(type => {
    if (fillTrips.search(type) === -1) {
      details.push({
        tripType: type,
        count: 0
      });
    }
  });
  return details;
};
const UserStatistics = (props) => {
  const [selectedDate, setSelectedDate] = useState(props.currentDate?props.currentDate:"2020-03-13");
  const statistics = useSelector(
    state => state.tripStatisticsReducer.statistics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStats(selectedDate));
  }, [selectedDate]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const { totalTrips, details: tripDetails } = statistics;
  const details = tripDetails && mapThroughTripTypes(tripDetails);
  return (
    <> 
    {props.displayDatePicker?null:
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid}>
          <KeyboardDatePicker
            disableToolbar
            size="small"
            fullWidth={true}
            inputVariant="outlined"
            variant="inline"
            format="yyyy-MM-dd"
            margin="none"
            id="date-picker-inline"
            label="Date to search from"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>}
      <p className={classes.title}>
        Total trips created:{" "}
        <span className={classes.span}>
          {totalTrips ? totalTrips : 0} trips
        </span>
      </p>
      <Grid container className={classes.root} spacing={6} justify="center">
        {!details ? (
          <p>Fetching trip details for this user</p>
        ) : (
          details.map((detail, index) => {
            return (
              <Grid item key={index}>
                <Paper className={classes.paper}>
                  <Grid container justify="center">
                    <img
                      src={tripIcons[detail.tripType]}
                      alt="icon"
                      className={classes.img}
                    />
                  </Grid>
                  <p className={classes.detailsType}>
                    {detail.tripType} trips you created
                  </p>
                  <p className={classes.count}>{detail.count}</p>
                </Paper>
              </Grid>
            );
          })
        )}
      </Grid>
      <Footer />
    </>
  );
};
export default UserStatistics;

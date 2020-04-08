import React from 'react';
import {Grid,Paper,Box,Typography,makeStyles} from '@material-ui/core';
import { Link } from "react-router-dom";




const useStyles = makeStyles(theme => ({

    paper: {
        textAlign: "center",
        color: "#000000",
        whiteSpace: "nowrap",
        marginTop: "2vh",
        marginBottom: "2vh",
        width: '693px',
        height: '285px',
        boxShadow:' 0.2px 0.2px 2px rgba(0, 0, 0, 0.25)',
['@media (max-width:750px)']: { 
    width: '308.77px',
    marginTop:'-45px',
    height: '335px',

  }
      },
message: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '18px',
    lineHeight: '21px',
    textAlign: 'center',
    color: '#616161',
['@media (max-width:750px)']: { 
fontSize:'12.5px',
lineHeight: '31px',
textAlign: 'center',
margin:'5px'

  }

}

}));


export default function ResetNofitication(){


        const classes = useStyles() ;

    return (

        <div>
      <Grid container >
     
       <img src= "https://res.cloudinary.com/drpye5niv/image/upload/v1580822689/barefoot_nomad_logo_xvfgsp.png" width="279px" height="91.93px"/>
      </Grid>
      <Box m={10} /> 
      <Grid container direction="column" justify="center" alignItems="center" >
      

              <Paper className={classes.paper}>

                <Grid container item direction="column" justify="center" alignItems="center" >
                <Typography className={classes.message}>Check your email address</Typography><br/>
   <br/>
                 <Typography className={classes.message}>We sent a reset password link on your email. <br/>Please click on the link we sent you to reset your password.
</Typography>

                </Grid>
            </Paper>




      </Grid>
</div>

    )
  }

export function ResetNofiticationSucess(){


      const classes = useStyles() ;

    return (

        <div>
      <Grid container >
     
       <img src= "https://res.cloudinary.com/drpye5niv/image/upload/v1580822689/barefoot_nomad_logo_xvfgsp.png" width="279px" height="91.93px"/>
      </Grid>
      <Box m={10} /> 
      <Grid container direction="column" justify="center" alignItems="center" >
      

              <Paper className={classes.paper}>

                <Grid container item direction="column" justify="center" alignItems="center" >
                <Typography className={classes.message}>Reset sucessfully</Typography><br/>
                 <Typography className={classes.message}>You have successfully reset the password<br/> for your barefoot Nomad account. <br/><br/>Please click here <Link to='/auth/signin'>to login</Link>
</Typography>

                </Grid>
            </Paper>




      </Grid>
</div>

    )
  }



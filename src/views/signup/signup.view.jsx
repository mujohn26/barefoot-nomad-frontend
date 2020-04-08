import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, useMediaQuery, Hidden } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import signupAction, { setErrorAction } from '../../actions/signupAction';
import SignupForm from '../../components/signup/signup_form.component.jsx';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory({
	forceRefresh: true,
});
export const Signup = (props) => {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: '',
        passwordMatch: true,
        isEmailValid: true,
        isPasswordValid: true,
        isLastnameValid: true,
        isFirstnameValid: true,
        isCountryValid: true,
        enableBtn: false
    });

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    useEffect(() => {

const token = localStorage.getItem('token');
if(token !== null){
	history.push('/');
}
      });

    return (
        <Box>
            <Grid className="view_container" alignItems="center" container>
                <Hidden xsDown>
                    <Grid item xs={12} md={6} xl={8} lg={8} container>
                        <Grid item>
                            <Box pb={12} pl={3}>
                                <img height="70" src="https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg" alt="logo" />
                            </Box>
                        </Grid>
                        <Grid xs={12} item container justify="center">
                            <Grid item>
                                <Box width={441}>
                                    <Typography id='msgTxt' style={{ fontWeight: "bold", fontSize: "25px", color: "#0094FF" }} align="center">
                                        Take only memories, leave only footprints
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Box pl={3} pt={5}>
                                <img width="80%" src="https://res.cloudinary.com/dlwzb2uh3/image/upload/v1580891967/barefootnomard/undraw_destinations_fpv7_1_1_lflof1.svg" alt="destinations" />
                            </Box>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden mdUp>
                    <Grid item xs={12}>
                        <Box pt={2} pl={3}>
                            <img height="60" src="https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg" alt="logo" />
                        </Box>
                    </Grid>
                </Hidden>
                <Grid item xs={12} md={6} xl={4} lg={4}>
                    <Container maxWidth="xs">
                        <SignupForm
                            values={values}
                            setValues={setValues}
                            style={matches ? { boxShadow: "none" } : {}}
                            history={props.history}
                            signupAction={props.signupAction}
                            setErrorAction={props.setErrorAction}
                            isLoading={props.isLoading}
                            isSignupCompleted={props.isSignupCompleted}
                            error={props.error} />
                    </Container>
                </Grid>
            </Grid>
        </Box>
    );
}

export const mapStateToProps = (state) => {
    return {
        isLoading: state.appReducer.isLoading,
        error: state.signupReducer.signupError,
        isSignupCompleted: state.signupReducer.isSignedup
    };
};

export default connect(mapStateToProps, { signupAction, setErrorAction })(Signup);

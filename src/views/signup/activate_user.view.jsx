import React, { useEffect } from 'react';
import queryString from 'query-string';
import { Card, Grid, Typography, CardContent, Box, Container, Link, CircularProgress } from '@material-ui/core';
import activateUserAction from '../../actions/activateUserAction';
import { connect } from 'react-redux';

export const ActivateUser = (props) => {

    useEffect(() => {
        const query = queryString.parse(location.search);
        if (query.token && props.hasRequestMade == false) {
            props.activateUserAction(query.token);
        }
    });

    return (
        <Grid container justify="center" className="view_container">

            <Grid item xs={12}>
                <Box pt={2} pl={3}>
                    <img height="60" src="https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg" alt="logo" />
                </Box>
            </Grid>
            {props.isLoading ? <Grid item>
                <CircularProgress />
            </Grid> : <Grid item xs={12} md={12} xl={6} lg={6}>
                    <Container>
                        <Card>
                            <CardContent>
                                <Box p={2}>
                                    <Box pb={3}>
                                        <Typography style={{ fontWeight: "bold", fontSize: 36 }} variant="h3">
                                            Your account has been activated successfully.
                                    </Typography>
                                    </Box>
                                    <Box pt={2}>
                                        <Typography variant="body2" style={{ fontSize: 18 }}>
                                            <Link style={{ textDecoration: 'none' }} href="/auth/signin">Sign In</Link> to start using Barefoot nomad.
                                    </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>}
        </Grid>
    )
}

export const mapStateToProps = (state) => {
    return {
        isActivated: state.activateUserReducer.isActivated,
        activateMessage: state.activateUserReducer.activateMessage,
        hasRequestMade: state.activateUserReducer.hasRequestMade,
        isLoading: state.appReducer.isLoading
    };
};

export default connect(mapStateToProps, { activateUserAction })(ActivateUser);;

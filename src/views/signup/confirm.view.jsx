import React from 'react';
import { Card, Grid, Typography, CardContent, Box, Container } from '@material-ui/core';

function Confirm() {
    return (
        <Grid container justify="center" className="view_container">
            <Grid item xs={12}>
                <Box pt={2} pl={3}>
                    <img height="60" src="https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg" alt="logo" />
                </Box>
            </Grid>
            <Grid item xs={12} md={12} xl={6} lg={6}>
                <Container>
                    <Card>
                        <CardContent>
                            <Box p={2}>
                                <Box pb={3}>
                                    <Typography style={{ fontWeight: "bold", fontSize: 36 }} variant="h3">
                                        Welcome to Barefoot Nomad!
                            </Typography>
                                </Box>
                                <Box pt={2}>
                                    <Typography variant="body2" style={{ fontSize: 18 }}>
                                            We have sent a verification link to your email. Please click on a link in your email to activate your account.
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Container>
            </Grid>
        </Grid>
    )
}

export default Confirm;

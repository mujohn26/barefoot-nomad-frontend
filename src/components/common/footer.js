import React, { Component } from 'react'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default class Footer extends Component {
    render() {
        return (
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright '}
                    {' '}
                    2019 - {new Date().getFullYear()}
                    {'  '}
                    <Link color="inherit" href="#">
                    Barefoot Nomad
                    </Link>
                </Typography>
            </Box>
        )
    }
}

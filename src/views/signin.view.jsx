import React, { PureComponent } from 'react';
import LoginForm from '../components/auth/Login.jsx';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { viewUseStyles } from '../styles/login/loginStyle.js';
import { Box, Hidden } from '@material-ui/core';

export class SignIn extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		};
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Box>
					<Grid className='view_container' alignItems='center' container>
						<Hidden xsDown>
							<Grid item xs={12} md={6} xl={8} lg={8} container>
								<Grid item>
									<Box pb={12} pl={3}>
										<img
											height='70'
											src='https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg'
											alt='logo'
										/>
									</Box>
								</Grid>
								<Grid item>
									<Box pl={3} pt={5}>
										<img
											width='68%'
											src='https://res.cloudinary.com/drpye5niv/image/upload/v1580822702/barefoot_homepage_image_eadp12.png'
											alt='destinations'
										/>
									</Box>
								</Grid>
							</Grid>
						</Hidden>
						<Hidden mdUp>
							<Grid item xs={12}>
								<Box pt={2} pl={3}>
									<img
										height='60'
										src='https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg'
										alt='logo'
									/>
								</Box>
							</Grid>
						</Hidden>
						<Grid item xs={12} md={6} xl={4} lg={4}>
							<Container maxWidth='xs'>
								<Paper className={classes.paper}>
									<LoginForm />
								</Paper>{' '}
							</Container>
						</Grid>
					</Grid>
				</Box>
			</div>
		);
	}
}

const connectedLoginPage = withStyles(viewUseStyles)(SignIn);

export default connectedLoginPage;

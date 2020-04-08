import React, { Component } from 'react';
import { Box, SvgIcon, Link, Button, Grid } from '@material-ui/core';
import { config } from 'dotenv';

export class SocialAuth extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Grid justify='space-between' container>
					<Grid item xs={6}>
						<Box pr={1}>
							<Link
								style={{ textDecoration: 'none' }}
								href='https://blackninjas-backend-staging.herokuapp.com/api/v1/auth/google'
							>
								<Button
									variant='outlined'
									color='primary'
									style={{ fontSize: '8px' }}
									fullWidth
									startIcon={
										<SvgIcon>
											<svg
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<g>
													<path
														d='M23.4392 12.2245C23.4392 11.2413 23.3594 10.5237 23.1867 9.77963H11.9588V14.2176H18.5493C18.4165 15.3205 17.699 16.9815 16.1045 18.0976L16.0821 18.2461L19.6322 20.9963L19.8781 21.0209C22.137 18.9347 23.4392 15.8653 23.4392 12.2245Z'
														fill='#4285F4'
													/>
													<path
														d='M11.9588 23.9176C15.1876 23.9176 17.8982 22.8545 19.8781 21.0209L16.1045 18.0976C15.0946 18.8018 13.7393 19.2934 11.9588 19.2934C8.79637 19.2934 6.11231 17.2074 5.15551 14.324L5.01527 14.3359L1.32385 17.1927L1.27557 17.3269C3.24211 21.2334 7.28153 23.9176 11.9588 23.9176Z'
														fill='#34A853'
													/>
													<path
														d='M5.15551 14.324C4.90305 13.5799 4.75695 12.7826 4.75695 11.9588C4.75695 11.1349 4.90305 10.3377 5.14223 9.59359L5.13554 9.43511L1.39786 6.53239L1.27557 6.59056C0.465069 8.21166 0 10.0321 0 11.9588C0 13.8855 0.465069 15.7058 1.27557 17.3269L5.15551 14.324Z'
														fill='#FBBC05'
													/>
													<path
														d='M11.9588 4.62403C14.2043 4.62403 15.7191 5.59402 16.5828 6.40461L19.9578 3.10928C17.885 1.1826 15.1876 0 11.9588 0C7.28153 0 3.24211 2.68406 1.27557 6.59056L5.14223 9.59359C6.11231 6.7102 8.79637 4.62403 11.9588 4.62403Z'
														fill='#EB4335'
													/>
												</g>
											</svg>
										</SvgIcon>
									}
								>
									Sign in with Google
								</Button>
							</Link>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box pl={1}>
							<Link
								style={{ textDecoration: 'none' }}
								href='https://blackninjas-backend-staging.herokuapp.com/api/v1/auth/facebook'
							>
								<Button
									variant='outlined'
									color='primary'
									style={{ fontSize: '8px' }}
									fullWidth
									startIcon={
										<SvgIcon>
											<svg
												width='24'
												height='24'
												viewBox='0 0 24 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M22.6738 0.000999451H1.3246C0.593539 0.000999451 0 0.593363 0 1.32562V22.6752C0 23.4075 0.593539 24.0006 1.3246 24.0006H12.8184V14.7065H9.69105V11.084H12.8184V8.41264C12.8184 5.3133 14.7108 3.62473 17.4762 3.62473C18.802 3.62473 19.9389 3.72392 20.2704 3.76699V7.00661L18.3523 7.0074C16.8487 7.0074 16.5586 7.72227 16.5586 8.77066V11.0828H20.1459L19.6769 14.705H16.5582V23.9994H22.6734C23.4053 23.9994 23.9992 23.4055 23.9992 22.6752V1.32483C23.9988 0.593363 23.4057 0.000999451 22.6738 0.000999451Z'
													fill='#0094FF'
												/>
											</svg>
										</SvgIcon>
									}
								>
									Sign in with Facebook
								</Button>
							</Link>
						</Box>
					</Grid>
				</Grid>
			</div>
		);
	}
}
export default SocialAuth;

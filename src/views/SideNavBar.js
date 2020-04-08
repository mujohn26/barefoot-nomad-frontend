import React from 'react';
import UserProfile from '../components/profile/userProfile.jsx';
import { Box } from '@material-ui/core';

export default function SideNavBarPage() {
	return (
		<Box style={{ minHeight: '10px', marginBottom: '20px' }}>
			<div className='dashboard_side-nav-bar_logo'>
				<img
					className='dashboard_side-nav-bar_logo_image'
					src='https://res.cloudinary.com/dlwzb2uh3/image/upload/v1581003340/barefootnomard/Group_13_jkrk8g.svg'
					alt='logo'
				/>
			</div>
			<UserProfile />
		</Box>
	);
}

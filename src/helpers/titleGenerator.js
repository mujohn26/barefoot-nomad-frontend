export const titleGenerator = () => {
	let title = '';
	paths.map(path => {
		if (path.pathName === window.location.pathname) {
			title = path.title;
		}
	});
	return title;
};

const paths = [
	{ pathName: '/trips', title: 'My Trip Requests' },
	{ pathName: '/make-trip-request', title: 'Create Trip Request' },
	{ pathName: '/profile', title: 'My Profile' },
	{ pathName: '/trips-stats', title: 'Trips statistics' },
	{ pathName: '/user/user-role-setting', title: 'User Role Settings' },
	{ pathName: '/user-management', title: 'Assign Users to managers' },
	{ pathName: '/create-accommodations', title: 'Create Accommodations' },
	{ pathName: '/approval-table', title: 'Approvals table' },
	{ pathName: '/', title: 'Dashboard' },
];

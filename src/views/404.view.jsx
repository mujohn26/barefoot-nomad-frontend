import React from 'react';

export const NotFound = () => {
	return (
		<section class='page_404'>
			<div class='center'>
				<div class='four_zero_four_bg'>
					<h1 class='text_404'>404</h1>
				</div>

				<div class='contant_box_404'>
					<h3 class='h2'>Look like you're lost</h3>

					<p>The page you are looking for is not available!</p>

					<a href='/' class='link_404'>
						Go to Home
					</a>
				</div>
			</div>
		</section>
	);
};

export default NotFound;

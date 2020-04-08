import React, { PureComponent } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Signup from '../views/signup/signup.view.jsx';
import Signin from '../views/signin.view.jsx';
import ForgotPassword from '../views/passwordReset/ForgotPassword';
import ResetPassword from '../views/passwordReset/ResetPassword ';
import ResetNotification from '../components/password/passwordNotification.jsx';
import { ResetNofiticationSucess } from '../components/password/passwordNotification.jsx';
import Confirm from '../views/signup/confirm.view.jsx';
import ActivateUser from '../views/signup/activate_user.view.jsx';
import NotFound from '../views/404.view.jsx';


class DefaultLayout extends PureComponent {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path='/auth'>
							<Redirect to='/auth/signin' />
						</Route>
						<Route
							path='/auth/forgot-password'
							exact
							component={ForgotPassword}
						/>
						<Route
							path='/auth/reset-notification'
							exact
							component={ResetNotification}
						/>
						<Route
							path='/auth/reset-password'
							exact
							component={ResetPassword}
						/>
						<Route
							path='/auth/reset-notification-sucess'
							exact
							component={ResetNofiticationSucess}
						/>
						<Route exact path='/auth/signup' component={Signup} />
						<Route exact path='/auth/signin' component={Signin} />
						<Route exact path='/auth/confirm' component={Confirm} />
						<Route exact path='/auth/activate' component={ActivateUser} />
						<Route component={NotFound} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default DefaultLayout;

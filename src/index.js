import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import App from './components/App.jsx';
import './styles/index.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>
			<App />
		</Provider>
	</MuiThemeProvider>,
	document.getElementById('root'),
);

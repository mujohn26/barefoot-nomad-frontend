import React from 'react';
import { mount } from 'enzyme';
import { Signup } from '../../src/views/signup/signup.view.jsx';
import { MemoryRouter } from 'react-router-dom';

describe('Render signup view', () => {
	it('should render signup view successfully', async () => {
		const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const signupProps = {
			signupAction: jest.fn(),
			setErrorAction: jest.fn(),
			error: '',
			isLoading: false,
		};
		mount(
			<MemoryRouter>
				<Signup {...signupProps} />
			</MemoryRouter>,
		);
	});
});

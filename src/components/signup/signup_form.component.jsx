import React, { useEffect } from 'react';
import { LinearProgress, SvgIcon, Grid, Typography, Card, Link, Box, Button } from '@material-ui/core';
import CountrySelector from '../common/CountrySelector.component.jsx';
import TextInput from "../common/TextInput.component.jsx";
import { createBrowserHistory } from 'history';
import { config } from 'dotenv';

config();

const history = createBrowserHistory({
    forceRefresh: true
})

export const SignupForm = (props) => {

    useEffect(() => {
        if (props.isSignupCompleted) {
            redirectOnSuccess();
        }
    });

    const redirectOnSuccess = () => {
        history.push('/auth/confirm');
    }

    const shouldBeDisabled = () => {
        const {
            firstName,
            lastName,
            country,
            email,
            password,
            passwordMatch,
            isEmailValid,
            isPasswordValid,
            isLastnameValid,
            isFirstnameValid,
            isCountryValid,
            enableBtn } = props.values;
        if (firstName &&
            lastName &&
            country &&
            email &&
            isEmailValid &&
            password.length >= 8 &&
            isPasswordValid &&
            isLastnameValid &&
            isFirstnameValid &&
            isCountryValid &&
            passwordMatch &&
            enableBtn &&
            !props.isLoading) {
            return false;
        }
        return true;
    };

    const onPasswordChange = (e) => {
        let isValid = !props.values.isPasswordValid ? false : true;
        if (!props.values.isPasswordValid) {
            const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            isValid = regEx.test(e.target.value);
        }
        props.setValues({ ...props.values, isPasswordValid: isValid, password: e.target.value });
    };
    const onPasswordBlur = (e) => {
        if (e.target.value.length > 0) {
            const regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            const isPasswordValid = regEx.test(e.target.value);
            props.setValues({ ...props.values, isPasswordValid: isPasswordValid, password: e.target.value });
        }
    };
    const onConfirmPasswordBlur = (e) => {
        let enableBtn = false;
        let passwordMatch = true;
        if (e.target.value.length > 0 && e.target.value === props.values.password) {
            passwordMatch = true;
            enableBtn = true;
        }
        else{
            if(e.target.value.length > 0 && e.target.value !== props.values.password){
                passwordMatch = false;
            }
        }
        props.setValues({ ...props.values, passwordMatch: passwordMatch, enableBtn: enableBtn });
    };
    const onConfirmPasswordChange = (e) => {
        let enableBtn = false;
        let passwordMatch = true;
        if (!props.values.passwordMatch) {
            if (e.target.value.length > 0 && e.target.value === props.values.password) {
                passwordMatch = true;
                enableBtn = true;
            }
            else{
                if(e.target.value.length > 0 && e.target.value !== props.values.password){
                    passwordMatch = false;
                }
            }
        }
        else if (e.target.value.length >= 8 && e.target.value === props.values.password) {
            passwordMatch = true;
            enableBtn = true;
        }
        props.setValues({ ...props.values, confirmPassword: e.target.value, passwordMatch: passwordMatch, enableBtn: enableBtn });
    };

    const onChange = (e) => {
        props.setValues({ ...props.values, firstName: e.target.value });
    };

    const onEmailBlur = (e) => {
        if (e.target.value.length > 0) {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const isEmailValid = regEx.test(e.target.value);
            props.setErrorAction('');
            props.setValues({ ...props.values, isEmailValid: isEmailValid, email: e.target.value });
        }
    };
    const onEmailChange = (e) => {
        let isEmailValid = !props.values.isEmailValid ? false : true;
        if (!props.values.isEmailValid) {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isEmailValid = regEx.test(e.target.value);
            props.setErrorAction('');
        }
        props.setValues({ ...props.values, isEmailValid: isEmailValid, email: e.target.value });
    };
    const onSignupBtnClick = () => {
        const { passwordMatch, isEmailValid, isPasswordValid, isLastnameValid, isFirstnameValid, isCountryValid, ...user } = props.values;
        props.signupAction(user);
    };
    return (
        <Card style={props.style}>
            <Box px={4} py={2}>
                <Typography style={{ fontWeight: "bold", fontSize: 36 }} variant="h3">
                    Sign up
                </Typography>
                <Typography variant="subtitle1">
                    Sign up to access the full features of Barefoot Nomad.
                </Typography>
                <Box pt={1} pb={1}>
                    <TextInput
                        id="firstname"
                        label="First name"
                        name="firstName"
                        defaultValue={props.values.firstName}
                        helperText={props.values.firstName.length > 0 && !props.values.isFirstnameValid ? "First name is not valid!" : ""}
                        error={props.values.firstName.length > 0 && !props.values.isFirstnameValid}
                        required={true} onChange={onChange} />
                    <TextInput
                        id="lastname"
                        label="Last name"
                        name="lastName"
                        defaultValue={props.values.lastName}
                        helperText={props.values.lastName.length > 0 && !props.values.isLastnameValid ? "Last name is not valid!" : ""}
                        error={props.values.lastName.length > 0 && !props.values.isLastnameValid}
                        required={true} onChange={(e) => { props.setValues({ ...props.values, lastName: e.target.value }); }} />
                    <CountrySelector
                        id="country_selector"
                        helperText={props.values.country.length > 0 && !props.values.isCountryValid ? "Country is not valid!" : ""}
                        error={props.values.country.length > 0 && !props.values.isCountryValid} required={true}
                        onChange={(country) => { props.setValues({ ...props.values, country: country }) }} />
                    <TextInput
                        id="email"
                        label="Email"
                        defaultValue={props.values.email}
                        type="email"
                        name="email"
                        helperText={props.values.email.length > 0 && !props.values.isEmailValid ? "Email is not valid!" : "" || props.error.length > 0 ? props.error : ''}
                        error={props.values.email.length > 0 && !props.values.isEmailValid || props.error.length > 0}
                        required={true}
                        onBlur={onEmailBlur}
                        onChange={onEmailChange} />
                    <TextInput
                        id="password"
                        label="Password"
                        name="password"
                        defaultValue={props.values.password}
                        helperText={props.values.password.length >= 0 && !props.values.isPasswordValid ? "Password must be alphanumeric with atleast 8 charactors." : ""}
                        error={props.values.password.length >= 0 && !props.values.isPasswordValid}
                        type="password"
                        required={true}
                        onBlur={onPasswordBlur}
                        onChange={onPasswordChange} />
                    <TextInput
                        id="confirm_password"
                        label="Confirm password"
                        type="password"
                        helperText={
                            !props.values.passwordMatch ?
                                "Password doesn't match!" :
                                ""}
                        error={!props.values.passwordMatch}
                        required={true}
                        onBlur={onConfirmPasswordBlur}
                        onChange={onConfirmPasswordChange}
                        />
                </Box>
                <Button
                    id="signupBtn"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disableElevation
                    onClick={onSignupBtnClick}
                    disabled={(shouldBeDisabled)()}>
                    Sign up
                </Button>
                <Box hidden={!props.isLoading} pt={0.5}>
                    <LinearProgress />
                </Box>
                <Grid container>
                    <Grid justify="center" container>
                        <Box pt={2} pb={2}>
                            <Typography variant="body2">
                                Or
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid justify="space-between" container>
                        <Grid item xs={6}>
                            <Box pr={1}>
                                <Link style={{ textDecoration: 'none' }} href={`${process.env.BACKEND_BASE_URL}/api/v1/auth/google`}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ fontSize: '8px' }}
                                        fullWidth
                                        startIcon={
                                            <SvgIcon>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g>
                                                        <path d="M23.4392 12.2245C23.4392 11.2413 23.3594 10.5237 23.1867 9.77963H11.9588V14.2176H18.5493C18.4165 15.3205 17.699 16.9815 16.1045 18.0976L16.0821 18.2461L19.6322 20.9963L19.8781 21.0209C22.137 18.9347 23.4392 15.8653 23.4392 12.2245Z" fill="#4285F4" />
                                                        <path d="M11.9588 23.9176C15.1876 23.9176 17.8982 22.8545 19.8781 21.0209L16.1045 18.0976C15.0946 18.8018 13.7393 19.2934 11.9588 19.2934C8.79637 19.2934 6.11231 17.2074 5.15551 14.324L5.01527 14.3359L1.32385 17.1927L1.27557 17.3269C3.24211 21.2334 7.28153 23.9176 11.9588 23.9176Z" fill="#34A853" />
                                                        <path d="M5.15551 14.324C4.90305 13.5799 4.75695 12.7826 4.75695 11.9588C4.75695 11.1349 4.90305 10.3377 5.14223 9.59359L5.13554 9.43511L1.39786 6.53239L1.27557 6.59056C0.465069 8.21166 0 10.0321 0 11.9588C0 13.8855 0.465069 15.7058 1.27557 17.3269L5.15551 14.324Z" fill="#FBBC05" />
                                                        <path d="M11.9588 4.62403C14.2043 4.62403 15.7191 5.59402 16.5828 6.40461L19.9578 3.10928C17.885 1.1826 15.1876 0 11.9588 0C7.28153 0 3.24211 2.68406 1.27557 6.59056L5.14223 9.59359C6.11231 6.7102 8.79637 4.62403 11.9588 4.62403Z" fill="#EB4335" />
                                                    </g>
                                                </svg>
                                            </SvgIcon>}>
                                        Sign up with Google
                                </Button>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box pl={1}>
                                <Link style={{ textDecoration: 'none' }} href={`${process.env.BACKEND_BASE_URL}/api/v1/auth/facebook`}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        style={{ fontSize: '8px' }}
                                        fullWidth
                                        startIcon={
                                            <SvgIcon>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.6738 0.000999451H1.3246C0.593539 0.000999451 0 0.593363 0 1.32562V22.6752C0 23.4075 0.593539 24.0006 1.3246 24.0006H12.8184V14.7065H9.69105V11.084H12.8184V8.41264C12.8184 5.3133 14.7108 3.62473 17.4762 3.62473C18.802 3.62473 19.9389 3.72392 20.2704 3.76699V7.00661L18.3523 7.0074C16.8487 7.0074 16.5586 7.72227 16.5586 8.77066V11.0828H20.1459L19.6769 14.705H16.5582V23.9994H22.6734C23.4053 23.9994 23.9992 23.4055 23.9992 22.6752V1.32483C23.9988 0.593363 23.4057 0.000999451 22.6738 0.000999451Z" fill="#0094FF" />
                                                </svg>
                                            </SvgIcon>}>
                                        Sign up with Facebook
                                    </Button>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid justify="center" container>
                        <Box pt={3} pb={1}>
                            <Typography variant="body2">
                                Have an account already? <Link style={{ textDecoration: 'none', color: '#0094FF' }} href="/auth/signin">Sign In</Link>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid justify="center" container>
                        <Box pt={1} pb={2}>
                            <Typography align="center" variant="body2">
                                By signing in or creating an account, you agree with our <Link href="#">Terms & Conditions</Link> and <Link href="#">Privacy Statement</Link>
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid justify="center" container>
                        <Typography variant="body2">
                            All rights reserved.
                        </Typography>
                        <Typography variant="body2">
                            Copyright (2019-2020) – Barefoot.com
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default SignupForm;

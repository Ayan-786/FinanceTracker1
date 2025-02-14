import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Input from './common/Input';
import { email, required, validator } from '../utils/validators';
import { isAuthenticated, signin } from '../utils/auth';
import { usePostRequest } from '../hooks/request';
import Button from './common/Button';
import ServerError from "./common/ServerError";

function LoginSection() {
    const signIn = usePostRequest({ url: '/users/sign-in', headers: {} });
    const navigate = useNavigate();
    const [error, setError] = useState()

    if (isAuthenticated()) {
        return <Navigate to="/account" />;
    }

    async function onSubmit(data) {
        const { response, success, error } = await signIn.request({ data });

        if (success) {
            signin(response, navigate);
        }
        if (error) {
            setError(error)
        }
    }
    return (
        <>

            <section className="login-section d-flex align-items-center">
                <div className="login-containerr">
                    <div className="login-box px-primary d-flex">
                        <div className="login-header d-flex align-items-center">
                            <h2 className="sign-in-text">
                                Sing in to{' '}
                                <span className="blue-text">
                                    {' '}
                                    finance tracker{' '}
                                </span>
                            </h2>
                            <p className="login-info-text">
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                        <ServerError error={error}/>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={onSubmit}
                        >
                            <Form className="login-form d-flex">
                                <div className="login-input-box d-flex">
                                    <label
                                        htmlFor=""
                                        className="login-input-box-label"
                                    >
                                        Account
                                    </label>
                                    <Input
                                        style={{ width: '100%' }}
                                        name="email"
                                        className="login-input"
                                        placeholder="Email or user name"
                                        validate={validator(required, email)}
                                    />
                                </div>
                                <div className="login-input-box d-flex">
                                    <label
                                        htmlFor=""
                                        className="login-input-box-label"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        style={{ width: '100%' }}
                                        name="password"
                                        type="password"
                                        className="login-input"
                                        placeholder="Your password"
                                        validate={required}
                                    />
                                    <a href="" className="forgot-password">
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="login-input-btns d-flex">
                                    <Button
                                        text="Log In"
                                        type="submit"
                                        className="btn-login"
                                    />

                                    <p className="question-text">
                                        Don’t you have an account?{' '}
                                        <Link
                                            to={'/sign-up'}
                                            className="account-creation-btn"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginSection;

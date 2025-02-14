import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Input from './common/Input';
import { usePostRequest } from '../hooks/request';
import ServerError from "./common/ServerError";

function SignUp() {
    const signUp = usePostRequest({ url: '/users/sign-up', headers: {} });
    const navigate = useNavigate();

    async function onSubmit(data) {
    if (data.password !== data.confirmPassword) {
        setErrorMessage('The passwords entered do not match.');
        return;
    }


        setErrorMessage('');

        const { success } = await signUp.request({
            data: {
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
            },
        });

        if (success) {
            navigate('/login');
        }


    }

    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <section className="login-section d-flex align-items-center">
                <div className="login-containerr">
                    <div className="login-box px-primary d-flex">
                        <div className="login-header d-flex align-items-center">
                            <h2 className="sign-in-text">
                                Sing up to{' '}
                                <span className="blue-text">
                                    {' '}
                                    finance tracker{' '}
                                </span>
                            </h2>
                            <p className="login-info-text">
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                        <ServerError error={signUp.error}/>
                        <Formik
                            initialValues={{
                                email: '',
                                firstName: '',
                                lastName: '',
                                password: '',
                                confirmPassword: '',
                            }}
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
                                        required
                                    />
                                </div>
                                <div className="login-input-box d-flex">
                                    <label
                                        htmlFor=""
                                        className="login-input-box-label"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        style={{ width: '100%' }}
                                        name="firstName"
                                        type="text"
                                        className="login-input"
                                        placeholder="Email or user name"
                                        required
                                    />
                                </div>
                                <div className="login-input-box d-flex">
                                    <label
                                        htmlFor=""
                                        className="login-input-box-label"
                                    >
                                        Second Name
                                    </label>
                                    <Input
                                        style={{ width: '100%' }}
                                        name="lastName"
                                        type="text"
                                        className="login-input"
                                        placeholder="Email or user name"
                                        required
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
                                    />
                                </div>
                                <div className="login-input-box d-flex">
                                    <label
                                        htmlFor=""
                                        className="login-input-box-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        style={{ width: '100%' }}
                                        name="confirmPassword"
                                        className="login-input"
                                        placeholder="Your password"
                                        type="password"
                                    />
                                </div>
                                <p style={{ color: 'red' }}>{errorMessage}</p>

                                <div className="login-input-btns d-flex">
                                    <button className="btn-login">
                                        Sign Up
                                    </button>
                                    <p className="question-text">
                                        Already have an account?{' '}
                                        <Link
                                            to={'/login'}
                                            className="account-creation-btn"
                                        >
                                            Log In
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

export default SignUp;

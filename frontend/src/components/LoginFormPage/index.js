import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import EmailError from './Errors/EmailError';
import PasswordError from './Errors/PasswordError';
import '../../context/AuthForm.css';

const LoginFormPage = ({ formTitle, handleSwitchForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    useEffect(() => {
        setSubmitDisabled(!(email.length >= 4 && password.length >= 6));
    }, [email, password]);

    if (sessionUser) return (
        <Redirect to="/" />
    )

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const handleDemoLogin = e => {
        e.preventDefault();
        return dispatch(sessionActions.demoLogin())
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    };

    const emailChange = e => {
        setErrors([]);
        setEmail(e.target.value);
    };

    const passwordChange = e => {
        setErrors([]);
        setPassword(e.target.value);
    };

    const validateEmail = e => {
        setEmailInvalid(email.length < 4);
    };

    const validatePassword = e => {
        setPasswordInvalid(password.length < 6);
    }

    return (
        <div id="login-form" className="page-wrapper flex-column centered bordered rounded-corners">
            <form
                className="auth-form stacked-form"
                onSubmit={handleSubmit}>
                <h2 className="centered">{formTitle}</h2>
                <label className="auth-form-element">
                    <input
                        type="text"
                        value={email}
                        onChange={emailChange}
                        onBlur={validateEmail}
                        placeholder="Email"
                        required
                    />
                    <EmailError visible={emailInvalid} />
                </label>
                <label className="auth-form-element">
                    <input
                        type="password"
                        value={password}
                        onChange={passwordChange}
                        onBlur={validatePassword}
                        placeholder="Password"
                        required
                    />
                    <PasswordError visible={passwordInvalid} />
                </label>
                {errors.length > 0 && (
                    <ul className='errors'>
                        {errors.map((error, i) => <li key={i} className="error-text">{error}</li>)}
                    </ul>
                )}
                <div className="flex-row gap-10px">
                    <button
                        type="submit"
                        className={`button-submit${submitDisabled ? ' disabled' : ''}`}
                        disabled={submitDisabled}
                    >
                        Log In
                    </button>
                    <button
                        className="button-demo-user"
                        onClick={handleDemoLogin}>
                        Demo User
                    </button>
                </div>
            </form>
            <p className="switch-form">
                No account? <span
                    className="green-text bolded cursor-pointer"
                    onClick={handleSwitchForm}
                >Create One</span>
            </p>
        </div>
    )
};

export default LoginFormPage;

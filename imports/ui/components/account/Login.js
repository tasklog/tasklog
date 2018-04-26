import { loginWithGoogle } from '/imports/utils/auth'
import { BrowserRouter, Redirect } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import GoogleIcon from 'react-icons/lib/fa/google'
import React from 'react'

const Login = () => (
    <BrowserRouter>
        <div className='login'>
            <Redirect to='/' />
            <div className='login__content'>
                <img src='/img/logo_dark.svg' alt='Tasklog Logo' className='login__content__logo' />
                <button className='login__content__with-google' onClick={loginWithGoogle}>
                    <GoogleIcon /> Login with Google
                </button>
                <div aria-hidden className='login__content__or' />
                <input type='email' placeholder='Email Address' className='login__content__input' />
                <input type='password' placeholder='Password' className='login__content__input' />
                <button className='login__content__login'>
                    Login
                </button>
            </div>
        </div>
    </BrowserRouter>
)

export default Login
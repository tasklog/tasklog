import React from 'react'
import GoogleButton from 'react-google-button'
import { loginWithGoogle } from '/imports/utils/auth'
import GoogleIcon from 'react-icons/lib/fa/google'

const Login = () => (
    <div className='login'>
        <div className='login__content'>
            <div className='login__content__logo' aria-hidden />
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
)

export default Login
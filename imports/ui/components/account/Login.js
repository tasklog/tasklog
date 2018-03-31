import React from 'react'
import GoogleButton from 'react-google-button'
import { loginWithGoogle } from '/imports/utils/auth'

const Login = () => (
    <GoogleButton onClick={loginWithGoogle} />
)

export default Login
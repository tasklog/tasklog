import React from 'react'
import { logout } from '../../../utils/auth'

const Logout = () => (
    <button onClick={logout}>
        Logout
    </button>
)

export default Logout
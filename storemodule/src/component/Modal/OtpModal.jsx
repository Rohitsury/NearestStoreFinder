import React, { useState } from 'react'
import '../../css/CommonStyle.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Link } from 'react-router-dom';
function OtpModal({ setModal }) {
    const [showPassword, setShowPassword] = useState(false)
    function handleSubmit(e) {
        e.preventDefault();
    }
    return (
        <>
            <form className='loginForm w-75 p-lg-5 p-3' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <ArrowBackIcon className='me-2 text-white' onClick={() => setModal(false)} />
                    <h5 className='fw-bold text-white text-center'>Verify OTP</h5>
                </div>                <div class="mb-3">
                    <label class="form-label">Enter OTP</label>
                    <input type="email" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">New Password</label>
                    <input type={showPassword ? "text" : "password"} class="form-control" />
                    <span className='password-toggle-icon btn mt-3' onClick={() => setShowPassword(!showPassword)}>
                        {
                            !showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />
                        }
                    </span>
                </div>
                <button type="submit" class=" loginButton py-2 me-3">Reset Password</button>
            </form>
        </>
    )
}

export default OtpModal
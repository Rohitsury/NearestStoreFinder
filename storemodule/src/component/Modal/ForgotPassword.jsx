import React, { useState } from 'react'
import '../../css/CommonStyle.css'
import { AppAssets } from '../../constant/AppAssets'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OtpModal from './OtpModal';
function ForgotPassword({ setModal }) {
  const [showOTP, setShowOTP] = useState(false);

  function handleSubmit(e) {
    e.preventDefault()
    setShowOTP(true)
  }
  return (
    <>
      {
        showOTP ?
          <OtpModal setModal={setModal} />
          :
          <form className='loginForm w-75 p-lg-5 p-3' onSubmit={handleSubmit}>
            <div className='d-flex'>
              <ArrowBackIcon className='me-2 text-white' onClick={() => setModal(false)} />
              <h5 className='fw-bold text-white text-center'>Forgot Password</h5>
            </div>
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" />
            </div>

            <button type="submit" class="loginButton py-2">Get OTP</button>
          </form>
      }
    </>
  )
}

export default ForgotPassword
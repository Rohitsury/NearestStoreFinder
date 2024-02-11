import React, { useState } from 'react'
import '../../css/CommonStyle.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'

function OtpModal({ setModal, userId, email }) {
    const navigate = useNavigate()
    const [otp, setOtp] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/storemodule/verifyotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, otp })
            })
            const res = await response.json();
            if (response.status === 200) {
                alert("OTP Verified Successfully. Please Login");
                setModal(false);
                navigate('/');
            }
            else if (response.status === 400) {
                alert(res.message);
            }
            else if (response.status === 500) {
                alert(res.message);
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function Resendotp(e) {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/storemodule/resentOtp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, email })
            })
            const res = await response.json();
            if (response.status === 200) {
                alert(res.message);
            }
            else if (response.status === 500) {
                alert(res.message);
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <form className='loginForm w-75 p-lg-5 p-3' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <ArrowBackIcon className='me-2 text-white' onClick={() => setModal(false)} />
                    <h5 className='fw-bold text-white text-center'>Verify OTP</h5>
                </div>
                <div class="mb-3">
                    <label class="form-label">Enter OTP</label>
                    <input type="number" onChange={(e) => setOtp(e.target.value)} class="form-control" />
                </div>
                <div className='d-flex'>
                    <button type="submit" class=" loginButton py-2 me-3">Verify</button>
                    <button onClick={Resendotp} class=" loginButton py-2 me-3">Resend OTP</button>
                </div>
            </form>
        </>
    )
}

export default OtpModal;
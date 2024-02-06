import React, { useState } from 'react'
import { AppAssets } from '../../constant/AppAssets'
import '../../css/CommonStyle.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);

  function handleSumbit(e) {
    e.preventDefault();

  }
  return (
    <>
      <section className='mainLoginBackground '>
        <div className='loginDiv container d-flex justify-content-center'>
          <div className="row loginRow ">
            <div className="col-12 col-lg-6 col-md-6">

              <nav class="navbar navbar-expand-lg navbar-light ps-4 pt-3 ">
                <Link class="navbar-brand" href="#">Medical Finder</Link>
              </nav>
              <div className='p-lg-5'>
                <h1 className='welcomeText'>Welcome !</h1>
                <h6 className='sloganText '>"Unlocking Healing, Unleashing Hope: Medicine Finder, Where Your Health Journey Begins."</h6>
                <div className='text-center text-lg-start'>
                  <h6 className='newUserText'>Already Have An Account ?</h6>
                  <Link to="/" className='btn signupButton'>Sign in</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 d-flex justify-content-center align-items-center p-lg-3 p-0">
              <form className='registerForm  p-lg-4 p-4' onSubmit={handleSumbit}>
                <h5 className='fw-bold text-white text-center'>Create an account</h5>
                <div class="mb-1">
                  <label class="form-label">Store Name</label>
                  <input type="text" class="form-control" />
                </div>
                <div class="mb-1">
                  <label class="form-label">Email address</label>
                  <input type="email" class="form-control" />
                </div>
                <div class="mb-1">
                  <label class="form-label">Phone</label>
                  <input type="number" class="form-control" />
                </div>
              <div className='row'>
                    <div class="mb-1 col-6">
                      <label class="form-label">Store Start Time</label>
                      <input type="time" class="form-control" />
                    </div>
                    <div class="mb-1 col-6">
                      <label class="form-label">Store Close Time</label>
                      <input type="time" class="form-control" />
                    </div>
              </div>
                <div class="mb-3">
                  <label class="form-label">Password</label>
                  <input type={showPassword ? "text" : "password"} class="form-control" />
                  <span className='password-toggle-register-icon btn' onClick={() => setShowPassword(!showPassword)}>
                    {
                      !showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />
                    }
                  </span>
                </div>

                  <button type="submit" class=" loginButton py-2">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
        // .mainLoginBackground{
        //   background-image: linear-gradient(135deg, rgba(0,0,0,.7) 0%, #764ba27d 100%),url(${AppAssets.LoginBackgroundImage});
        // }
        .loginRow{
          background-image: linear-gradient(to top, rgba(0,0,0,1) 0%, #330867c8 100%),url(${AppAssets.LoginBackgroundImage});
        }
      
      `}
      </style>
    </>
  )

}



export default React.memo(RegisterScreen);


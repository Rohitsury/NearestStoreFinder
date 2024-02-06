import React, { useState } from 'react'
import { AppAssets } from '../../constant/AppAssets'
import '../../css/CommonStyle.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import ForgotPassword from '../../component/Modal/ForgotPassword';
function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false)
  function handleSumbit(e) {
    e.preventDefault();

  }
  return (
    <>
      <section className='mainLoginBackground'>
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
                  <h6 className='newUserText'>Don't Have An Account ?</h6>
                  <Link to="/register" className='btn signupButton'>Sign up</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 col-md-6 d-flex justify-content-center align-items-center p-lg-5 p-0 pt-lg-0 ">
              {!modal ?
                <form className='loginForm w-75 p-lg-5 p-3' onSubmit={handleSumbit}>
                  <h5 className='fw-bold text-white text-center'>Login</h5>
                  <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type={showPassword ? "text" : "password"} class="form-control" />
                    <span className='password-toggle-icon btn' onClick={() => setShowPassword(!showPassword)}>
                      {
                        !showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />
                      }
                    </span>
                  </div>

                  <button type="submit" class=" loginButton py-2">Sign in</button>
                  <Link onClick={() => setModal(true)} className='d-block mt-2 forgotPasswordText'>Forgot Password ?</Link>
                </form>
                :
                <ForgotPassword setModal={setModal} />
              }

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



export default React.memo(LoginScreen);


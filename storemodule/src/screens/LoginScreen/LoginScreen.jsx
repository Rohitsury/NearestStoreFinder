import React, { useState } from 'react'
import { AppAssets } from '../../constant/AppAssets'
import '../../css/CommonStyle.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPassword from '../../component/Modal/ForgotPassword';
function LoginScreen() {
  const navigate = useNavigate();

  //we create state variables using useState hook 
  // useState is used to create state variables in functional components
  // whenever we have to change state variables we use set function
  // wherever we change any state variable that time component will re-render automatically
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(false)
  const [credentials, setCredentials] = useState({})


  // we create a function to change state variables means when we change any input field value that time this function will be called automatically
  function handleChange(e) {
    // we are using setCredentials function to change state variables
    // ... is spread operator that can be used to merge two or more objects
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }


  // we create a function to submit form means when user clicks on signin button that time this function will be called 
  async function handleSumbit(e) {
    // preventDefault() is used to prevent form from submitting and page from refreshing
    e.preventDefault();
    try {
      // fetch is used to send http request to server 
      // here http://localhost:5000/storemodule/login is the api endpoint  
      const response = await fetch("http://localhost:5000/storemodule/login", {
        // method is used to send http request type
        method: "POST",

        // headers is used to send http request headers
        headers: {
          // "Content-Type": "application/json" means we are sending json data becuase we are using json server
          "Content-Type": "application/json"
        },

        // body is used to send http request body , here in body we pass data to server and in backend in req.body we can get all data which passed from body
        body: JSON.stringify(credentials)
      });

      // response.json() is used to convert response from server to json format
      const res = await response.json();

      // if response status is 200 means login success
      if (response.status === 200) {
        alert(res.message)

        // we are using local storage to store authentication token further token is used to check user is logged in or not
        localStorage.setItem("authenticationToken", res.token)
        navigate('/dashboard')
      }
      // if response status is 404 means user not found
      else if (response.status === 404) {
        alert(res.message)
      }
      // if response status is 400 means invalid credentials
      else if (response.status === 400) {
        alert(res.message)
      }

      // if response status is 500 means server error
      else if (response.status === 500) {
        alert(res.message)
      }
    }
    catch (err) {
    }

  }
  return (
    <>
      <section className='mainLoginBackground'>
        <div className='loginDiv container d-flex justify-content-center'>
          <div className="row loginRow ">
            <div className="col-12 col-lg-6 col-md-6">
              <nav className="navbar navbar-expand-lg navbar-light ps-4 pt-3 ">
                <Link className="navbar-brand" href="#">Medical Store Finder</Link>
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
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} class="form-control" required />
                    <span className='password-toggle-icon btn' onClick={() => setShowPassword(!showPassword)}>
                      {
                        !showPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />
                      }
                    </span>
                  </div>

                  <button type="submit" className=" loginButton py-2">Sign in</button>
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


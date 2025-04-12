import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  // defining the states , always do before the return
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  // 11/4/25 we're creating a signup for which we need firstname,lastname
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // a toggle to switch between login and signup form
  const [isLoggedIn, setisLoggedIn] = useState(true);

  //5/4/25 we are making an error handle , when user enter wrong creditionals it will show error
  const [error, setError] = useState("");

  // we are dispatching to redux store
  const dispatch = useDispatch();
  // navigate
  const navigate = useNavigate();

  // We are making a handlelogin function which when click on login button will send the data in backend for login
  // That's why we use axios , which helps in making this request . Its better than fetch.post() since it doesn't require to manually convert into json which fetch needs to do
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // the data is stored in redux store
      dispatch(addUser(res.data));
      // when you click login after that the page will redirect to feed page
      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
    }
  };

  // We are making a signup form , when clicked user's data will be updated to db

  const handleSignup= async()=>{
    try {
      const res= await axios.post(BASE_URL+"/signup",{
        firstName,
        lastName,
        emailId,
        password
      },{withCredentials:true})

  
      // adding to redux store
      dispatch(addUser(res.data.data))
      return navigate('/profile')
    } catch (error) {
      
    }
  }


  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-sm my-10">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoggedIn ? "Log In":"Signup"}</h2>
          <div>
            {!isLoggedIn && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name </legend>
                  {/* we are making usestate for emailid */}
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name </legend>

                  <input
                    type="text"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID </legend>
              {/* we are making usestate for emailid */}
              <input
                type="text"
                className="input"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password </legend>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary " onClick={isLoggedIn ?handleLogin:handleSignup}>
              {isLoggedIn ?"Login":"Sign Up"}
            </button>
          </div>
          <p className="m-auto cursor-pointer" onClick={()=>setisLoggedIn((value)=>!value)}>
            {isLoggedIn ?"New User ? Signup Here":" Already a User, LogIn Here"}</p>

        </div>
      </div>
    </div>
  );
};

export default Login;

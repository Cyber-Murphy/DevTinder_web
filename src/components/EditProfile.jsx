import React, { useState } from "react";
import Usercard from "./Usercard";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photo, setPhoto] = useState(user.photo);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  // creating a state for alert toast message
  const [toast, setToast] = useState(false);
  // now we are making save profile , so when the user edits and save it gets save and also it updates the redux store

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photo,
          gender,
          about,
        },
        { withCredentials: true }
      );

      // update the redux store
      dispatch(addUser(res?.data?.data));
      // the alert message will go after 3 seconds
      setToast(true)
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10  ">
        <div className="flex justify-center">
          <div className="card bg-base-300 w-96 shadow-sm mx-10">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name </legend>
                  <input
                    type="text"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
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
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo</legend>
                  <input
                    type="text"
                    className="input"
                    value={photo}
                    onChange={(e) => setPhoto(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age </legend>
                  <input
                    type="text"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender </legend>
                  <input
                    type="text"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About </legend>
                  <input
                    type="text"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>

                <p className="text-red-500"></p>
              </div>
              <div className="card-actions justify-center my-4">
                <button className="btn btn-primary " onClick={saveProfile}>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {/** we are now making a user card side by side  where the user edit its profile 
     * the user={} they are coming from the redux store i.e in profile.jsx where  we have writtern this    <EditProfile user={user}/>
     
    */}
        <Usercard user={{ firstName, lastName, age, gender, about, photo }} />
      </div>
          {/** if toast is present then only  */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

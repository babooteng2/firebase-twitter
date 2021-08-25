import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOut = () => {
    history.push("/");
    authService.signOut();
  };
  return (
    <>
      <h2>Profile</h2>
      <button onClick={onLogOut}>Log Out</button>
    </>
  );
};
export default Profile;

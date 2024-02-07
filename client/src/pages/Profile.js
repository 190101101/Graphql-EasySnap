import React from "react";
import Moment from "react-moment";

const Profile = ({ session:{activeUser} }) => {
  return (
    <div>
      <h3>Profile</h3>
      <Moment format="YYYY/MM/DD">{activeUser.createdAt}</Moment>
      <h4>id: {activeUser.id}</h4>
      <h4>@{activeUser.username}</h4>
    </div>
  );
};

export default Profile;

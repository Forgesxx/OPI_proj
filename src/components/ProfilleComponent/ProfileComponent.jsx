import React from "react";
import './ProfileComponent.css'
const ProfileComponent = () => {
    const userData = {
        username: 'JohnDoe',
        email: 'john.doe@example.com',
      };
    
      return (
        <div className="container">
          <h2 className="heading">User Profile</h2>
          <div className="content">
            <span className="label">Username:</span> {userData.username}
          </div>
          <div className="content">
            <span className="label">Email:</span> {userData.email}
          </div>
        </div>
      );
    };
    
    export default ProfileComponent;
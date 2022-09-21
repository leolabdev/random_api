import React, { useState, useEffect } from 'react';

import UserTokens from "./UserTokens";

function ProfilePage() {
    const apiBasePath = `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

  return (
      <div id="container">
            <UserTokens></UserTokens>
      </div>
  );
}

export default ProfilePage;
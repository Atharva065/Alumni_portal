import React, { useState } from "react";
import userContext from "./userContext";

const UserState = (props) => {
  const [user, setUser] = useState({});
  const changeUser = (data) => {
    setUser({
      ...data,
    });
  };

  const [login, setLogin] = useState(false);
  const changeLogin = (val) => {
    setLogin(val);
  };
  const [youtube, setYoutube] = useState({});
  const changeYoutube = (val) => {
    setYoutube(val);
  };
  return (
    <userContext.Provider
      value={{
        user,
        changeUser,
        login,
        changeLogin,
        youtube,
        changeYoutube,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;

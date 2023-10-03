import React, { useState, useContext, useEffect } from "react";

const userContext = React.createContext();
const userToggleContext = React.createContext();
const useUserLogOut = React.createContext();
// import { useNavigate } from "react-router-dom";

export function useUserContext() {
    return useContext(userContext);
}

export function useUserToggleContext() {
  return useContext(userToggleContext);
}

export function UserProvider(props) {

    const [user, setUser] = useState((localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id)?JSON.parse(localStorage.getItem("user")):"");
    // const navigate = useNavigate();

    const isLogin = () => {
      return (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")) && JSON.parse(localStorage.getItem("user")).id);
    }

    const saveUser = (user1) => {
      localStorage.setItem("user",JSON.stringify(user1));
      setUser(user1);
    }

    const logout = () => {
      localStorage.setItem("user","null");
      setUser({});
    }

    useEffect(() => {
      if(!(user && user.id)){
        // navigate("/");
      }
      // setEditorHtml(props.editor)
    },[user]);

    return (
        <userContext.Provider value={user}>
            <userToggleContext.Provider value={{
              saveUser,
              logout,
              isLogin
            }}>
                {props.children}
            </userToggleContext.Provider>
        </userContext.Provider>
    );
}

import { createContext, useEffect, useState } from "react";

import history from "src/history";
import calendar from "../api/calendar";

export const UserContext = createContext({
  user: null,
  signin: () => {},
  login: () => {},
  logout: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initUser();
    setInterval(getToken, 60 * 59 * 1000);
  }, []);

  async function getToken() {
    const token = await renewToken();
    console.log("getToken", token);
    assingUser({ ...user, token });
  }

  async function initUser() {
    try {
      if (localStorage.getItem("token") && user === null) {
        const newToken = await renewToken();
        if (newToken) {
          assingUser({
            token: newToken,
            user: {
              id: localStorage.getItem("owner"),
              name: localStorage.getItem("ownerName"),
            },
          });
          history.push("/");
        }
      }
    } catch (error) {
      console.log("Token expirou", error.message);
    }
  }

  function assingUser(user) {
    setUser(user);
    localStorage.setItem("token", user?.token);
    localStorage.setItem("owner", user?.user.id);
    localStorage.setItem("ownerName", user?.user.name);
  }

  function handleError({ response }) {
    throw new Error(response.data.err);
  }

  async function login({ name, password }) {
    try {
      const { data } = await calendar.post("/user/login", { name, password });
      assingUser(data);
      history.push("/");
    } catch (error) {
      handleError(error);
    }
  }

  async function signin({ name, password }) {
    try {
      const { data } = await calendar.post("/user/signin", { name, password });
      assingUser(data);
      history.push("/");
    } catch (error) {
      handleError(error);
    }
  }

  async function renewToken() {
    try {
      const { data } = await calendar.post("user/new-token");
      console.log("renewToken", data.newToken);
      return data.newToken;
    } catch (error) {
      handleError(error);
    }
  }

  async function logout() {
    try {
      await calendar.post("/user/logout");
      assingUser(null);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <UserContext.Provider value={{ login, signin, logout, user }}>
      {children}
    </UserContext.Provider>
  );
}

import { createContext, useEffect, useState } from "react";
import calendar from "../api/calendar";

export const UserContext = createContext({
  user: null,
  signin: () => {},
  login: () => {},
  logout: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      assingUser({
        token: localStorage.getItem("token"),
        user: {
          id: localStorage.getItem("owner"),
          name: localStorage.getItem("ownerName"),
        },
      });
    }
  }, []);

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
    } catch (error) {
      handleError(error);
    }
  }

  async function signin({ name, password }) {
    try {
      const { data } = await calendar.post("/user/signin", { name, password });
      assingUser(data);
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

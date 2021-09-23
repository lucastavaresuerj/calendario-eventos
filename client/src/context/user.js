import { createContext, useState, useEffect } from "react";
import calendar from "../api/calendar";

const UserContext = createContext({
  user: null,
  sigin: () => {},
  login: () => {},
  logout: () => {},
});

export { UserContext };

export default function UserProvider({ children, restricted }) {
  const [user, setUser] = useState();

  function assingUser(user) {
    setUser(user);
    localStorage.setItem("token", user.token);
    localStorage.setItem("owner", user.user.id);
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
      const { data } = await calendar.post("/userlogout");
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

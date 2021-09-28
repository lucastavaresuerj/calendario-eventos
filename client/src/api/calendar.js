import axios from "axios";

const { REACT_APP_CALENDAR_API_ADDRESS } = process.env;

const calendar = axios.create({
  baseURL: REACT_APP_CALENDAR_API_ADDRESS,
  headers: {
    owner: localStorage.getItem("owner"),
  },
});

calendar.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["x-access-token"] = token;
    } else {
      delete calendar.defaults.headers.common["x-access-token"];
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default calendar;

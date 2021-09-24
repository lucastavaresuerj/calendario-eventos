import axios from "axios";

const { REACT_APP_CALENDAR_API_ADDRESS } = process.env;

const calendar = axios.create({
  baseURL: REACT_APP_CALENDAR_API_ADDRESS,
  headers: {
    "x-access-token": sessionStorage.getItem("x-access-token"),
    owner: sessionStorage.getItem("owner"),
  },
});

export default calendar;

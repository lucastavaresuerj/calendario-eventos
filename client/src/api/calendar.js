import axios from "axios";

const { REACT_APP_CALENDAR_API_ADDRESS } = process.env;

console.log(REACT_APP_CALENDAR_API_ADDRESS);

const calendar = axios.create({
  baseURL: REACT_APP_CALENDAR_API_ADDRESS,
  headers: {
    "x-access-token": localStorage.getItem("x-access-token"),
    owner: localStorage.getItem("owner"),
  },
});

export default calendar;

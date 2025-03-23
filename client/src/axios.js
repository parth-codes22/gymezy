import axios from "axios";

const debug = localStorage.getItem("debug");
const url = "http://localhost:5000"; 

const instance = axios.create({
  baseURL: url,
});

instance.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export default instance;

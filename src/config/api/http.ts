import axios from "axios";
import { BASE_URL } from "./index";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
    Device: "Mobile",
  },
});

export default instance;

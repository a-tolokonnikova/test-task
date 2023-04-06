import axios from "axios";
import { BASE_URL } from "./constants";

export const playerApi = axios.create({
  baseURL: BASE_URL
})

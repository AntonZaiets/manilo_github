import axios from "axios";

//export const BASE_URL_BACK = "https://manilo.onrender.com";
export const BASE_URL_BACK = "http://localhost:4444";
//export const BASE_URL_BACK = "https://sore-blue-coral-yoke.cyclic.app";

const instance: any = axios.create({
  baseURL: BASE_URL_BACK,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;

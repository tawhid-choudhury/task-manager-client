import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_SERVERLINK}`,
  withCredentials: true,
});

export default axiosPublic;

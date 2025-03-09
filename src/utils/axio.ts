import axios, { AxiosInstance } from "axios";

const getInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  });
};

export default getInstance;

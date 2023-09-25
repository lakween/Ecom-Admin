import axios from "axios";

const baseUrl = "http://localhost:8080"

axios.interceptors.request.use(function (config) {
   config.headers.Authorization = `Bearer ${sessionStorage.getItem("bearerToken")}`;
   return config;
 }, function (error) {
   return Promise.reject(error);
 });

export const post = async ({ body = {}, api }) => {
   try {
      const res = await axios.post(baseUrl + '/api/' + api, body)
      return res
   } catch (e) {
      throw e
   }
}
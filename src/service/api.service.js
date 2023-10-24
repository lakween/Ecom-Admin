import axios from "axios";

const baseUrl = "http://localhost:8080"

axios.interceptors.request.use(function (config) {
   config.headers.Authorization = sessionStorage.getItem("bearerToken");
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

export const put = async ({ body = {}, api }) => {
   try {
      const res = await axios.put(baseUrl + '/api/' + api, body)
      return res
   } catch (e) {
      throw e
   }
}

export const get = async ({ body = {}, api }) => {
   try {
      const res = await axios.get(baseUrl + '/api/' + api, body)
      return res?.data?.result
   } catch (e) {
      throw e
   }
}
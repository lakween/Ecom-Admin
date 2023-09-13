import axios from "axios";

const baseUrl = "http://localhost:8080"

export const post = async ({ body = {}, api }) => {
   try {
      const res = await axios.post(baseUrl + '/' + api, body)
      return res
   } catch (e) {
      throw e
   }
}
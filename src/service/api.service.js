import axios from "axios";

const baseUrl = "https://jsonplaceholder.typicode.com/posts"

export const get = async ({body={},api})=>{
   return await axios.get(baseUrl+'/'+api)
}
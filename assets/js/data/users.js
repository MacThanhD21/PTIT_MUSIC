import { fetchApi } from "../services/fetchApi.js";

const API_ALL_USERS = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pkcss/endpoint/getallusers";

// Use async/await to fetch and export the data
async function fetchData() {
  try {
    return await fetchApi(API_ALL_USERS);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const users = await fetchData();

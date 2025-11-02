import axios from "axios";

const localApi = axios.create({
  baseURL: "",
});

export default localApi;

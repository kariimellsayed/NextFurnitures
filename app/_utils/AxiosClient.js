// const { default: axios } = require("axios");

import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;

const apiUrl = "https://furnituresstrapi-production.up.railway.app/api/";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default axiosClient;

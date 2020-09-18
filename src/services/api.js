import axios from "axios";

const api = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public",
});

api.defaults.params = { apikey: "49ae6e3f28c95bf83324f06753517630" };

export default api;

import axios from "axios";
import CryptoJs from "crypto-js";

const ts = new Date().getTime() || 1;
const privatekey = "67ddf7ce071603af019e0af9b32084cf30a23a90";
const publicKey = "49ae6e3f28c95bf83324f06753517630";
const hash = CryptoJs.MD5(ts + privatekey + publicKey);

const api = axios.create({
  baseURL: "https://gateway.marvel.com:443/v1/public"
});

api.defaults.params = { apikey: publicKey, ts, hash: hash.toString() };

export default api;

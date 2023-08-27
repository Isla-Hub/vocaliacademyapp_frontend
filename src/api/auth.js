import axios from "../config/axiosConfig";

const login = async ({ email, password }) => {
  return await axios.post("/auth/login", { email, password });
};

export default login;

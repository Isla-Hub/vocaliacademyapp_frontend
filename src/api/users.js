import axios from "../config/axiosConfig";

const getUserData = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getUserData };

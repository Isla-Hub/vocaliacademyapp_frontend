import axios from "../config/axiosConfig";

const getUserData = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const putUserData = async (userId, data) => {
  try {
    const response = await axios.put(`/users/${userId}`, data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getUserData, putUserData };

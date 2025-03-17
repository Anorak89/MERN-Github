import axios from "axios";

const LOGIN_ENDPOINT = "http://localhost:3003/api/login";

const login = async (userCredentials) => {
  const loginResponse = await axios.post(LOGIN_ENDPOINT, userCredentials);
  return loginResponse.data;
};

export default { login };
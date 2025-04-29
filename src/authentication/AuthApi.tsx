import apiCall from "../services/api/apiServices";
import ENDPOINTS from "../utils/endpoints";

const fetchUsers = () => {
  apiCall(ENDPOINTS.USERS, {
    method: "GET",
  })
    .then((response) => {
      console.log("Users:", response.data);
    })
    .catch((error) => {
      console.log("API Error:", error.message);
    });
};

export default fetchUsers;

apiCall(ENDPOINTS.USERS, {
  method: "POST",
  data: {
    title: "NEW Post",
    body: "Hello World!",
  },
});

import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(null, (error) => {
  console.dir(error);
  const { response } = error;

  if (!response) {
    console.log("error", response);
  }

  if (response && response.status >= 403) {
    window.location = "/";
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;

import Axios from "axios";

export const URL_DEPLOY = "https://book-store-fazztrack.herokuapp.com/auth";
export const URL_LOCAL = "http://192.168.100.17:8080/auth";

export const login = (email, pass, onSuccess, onError) => {
  const body = {
    email,
    pass,
  };
  Axios.post(URL_DEPLOY, body)
    .then(res => onSuccess(res))
    .catch(err => onError(err));
};

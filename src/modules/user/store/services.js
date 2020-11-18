import { apiAxios, setHeaders } from "../../../services/axios";

export const login = (body) =>
  apiAxios.post("login", body).then((res) => {
    if (res.data.status === "successful") {
      setHeaders({ token: res.data.result.api_token });
    }

    return res.data;
  });

export const register = (body) =>
  apiAxios.post("register", body).then((res) => {
    return res.data;
  });

export const forgotPassword = (body) =>
  apiAxios.post("", body).then((res) => {
    return res.data;
  });

export const changePassword = (body) =>
  apiAxios.post("change-password", body).then((res) => {
    return res.data;
  });

export const getUser = (filter) => {
  var url = `user?page_id=${filter.page_id}&page_size=${filter.page_size}&filters=`;
  if (filter.role) {
    url += ",role=" + filter.role;
  }
  if (filter.status) {
    url += ",status=" + filter.status;
  }
  if (filter.search) {
    url += ",p=" + filter.status;
  }
  return apiAxios.get(url).then((res) => {
    return res.data;
  });
};

export const updateUser = (body) => {
  apiAxios.put(`user/${body.id}`, body).then((res) => {
    return res.data;
  });
};

export const createUser = (body) => {
  apiAxios.post("user", body).then((res) => {
    return res.data;
  });
};

export const uploadAvatar = ({ file }) => {
  let formData = new FormData();
  formData.append("file", file);

  apiAxios.post("upload", formData).then((res) => {
    return res.data;
  });
};

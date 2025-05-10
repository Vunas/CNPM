import axiosClient from "./axiosClient";

const uploadApi = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  getFile: (fileName) =>
    axiosClient.get(`/upload/${fileName}`, { responseType: "blob" }),
};

export default uploadApi;

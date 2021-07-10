import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002/api",
});

// export const insertUser = (payload) => api.post(`/user`, payload);
export const getAllMeetings = () => api.get(`/meets/${localStorage.getItem('userId')}`);

export const getMeetingById = (id) => api.get(`/meeting/${localStorage.getItem(id)}`);
export const getHostIDByMeetingID = (id) => api.get(`/meeting/${localStorage.getItem(id)}`);

// export const updateUserById = (id, payload) => api.put(`/user/${id}`, payload);
// export const deleteUserById = (id) => api.delete(`/user/${id}`);
// export const getUserById = (id) => api.get(`/user/${id}`);

// export const insertImage = (payload) => api.post(`/image`, payload);
// export const getAllImages = () => api.get(`/images`);
// export const updateImageById = (id, payload) =>
//   api.put(`/image/${id}`, payload);
// export const deleteImageById = (id) => api.delete(`/image/${id}`);
// export const getImageById = (id) => api.get(`/image/${id}`);

// export const insertProduct = (payload) => api.post(`/product`, payload);
// export const getAllProducts = () => api.get(`/products`);
export const updateMeetingById = (id, payload) =>
   api.put(`/meets/${localStorage.getItem('_id')}`, payload);
  //  export const addparticipant = (id, payload) =>
  //  api.put(`/addParticipant/${localStorage.getItem('_id')}`, payload);
export const deleteMeetingById = (id) => api.delete(`/meets/${localStorage.getItem('_id')}`);
export const deleteParticipantById = (id) => api.delete(`/meets/${localStorage.getItem('_id')}`);

// export const getProductById = (id) => api.get(`/product/${id}`);
// export const search = (category, condition, price) =>
//   api.get(
//     `/products/search?category=${category}&condition=${condition}&price=${price}`
//   );
// export const sort = () => api.get(`/products/sort`);
// export const groupByCategory = (category) =>
//   api.get(`products/groupby?category=${category}`);
// export const mapAndReduce = () => api.get(`/products/mapreduce`);

const apis = {
  // insertUser,
  getAllMeetings,
  getMeetingById,
  getHostIDByMeetingID,
  // updateUserById,
  // deleteUserById,
  // getUserById,

  // insertImage,
  // getAllImages,
  // updateImageById,
  // deleteImageById,
  // getImageById,

  // insertProduct,
  // getAllProducts,
  // updateProductById,
  deleteMeetingById,
  // addparticipant,
  // getProductById,
  // search,
  // sort,
  // groupByCategory,
  // mapAndReduce,
};

export default apis;

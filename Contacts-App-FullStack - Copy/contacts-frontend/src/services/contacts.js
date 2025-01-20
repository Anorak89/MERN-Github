import axios from "axios";

const baseURL = "http://localhost:3001/api/contacts";

const getContacts = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const addContact = (contact) => {
  return axios.post(baseURL, contact).then((res) => res.data);
};

const updateContact = (contact) => {
  return axios.put(`${baseURL}/${contact.id}`, contact)
  .then((res) => res.data);
};

const deleteContact = (contact) => {
    return axios.delete(`${baseURL}/${contact.id}`).then((res) => res.data);
};



export default { getContacts, addContact, updateContact, deleteContact };
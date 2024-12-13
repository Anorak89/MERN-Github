import { useState } from "react";

const AddContact = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleChange1 = (e) => setNewName(e.target.value);
  const handleChange2 = (e) => setNewEmail(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newName, newEmail);
    setNewName("");
    setNewEmail("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter contact name"
        value={newName}
        onChange={handleChange1}
      />
      <input
        type="text"
        placeholder="Enter email"
        value={newEmail}
        onChange={handleChange2}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContact;

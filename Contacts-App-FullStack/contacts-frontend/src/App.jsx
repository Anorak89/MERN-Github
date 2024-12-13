import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import "./index.css";
import contactService from "./services/contacts";


const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactService.getContacts().then((data) => setContacts(data));
  }, []);

  const handleSubmit = (newName, newEmail) => {
    //e.preventDefault();
    const newContactObj = {
      name: newName,
      email: newEmail
    };
    const oldName = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.trim().toLowerCase()
    );
    
    if (oldName) {
      const confirm1 = window.confirm(`Would you like to update ${oldName.name}'s email?`)
      const updatedContactObj = { ...oldName, email: newEmail };
      if(confirm1){
        contactService.updateContact(updatedContactObj).then((updatedContact) => {
          setContacts(
            contacts.map((contact) =>
              contact.id !== updatedContact.id ? contact : updatedContact
            )
          );
        })
      }
      return;
    }
    else{
      contactService.addContact(newContactObj).then((data) => {
        if(newContactObj.name.trim() ===""){
          alert("Must specify a contact name");
          return;
        }
        setContacts(contacts.concat(data));
        return;
      })
    }
  };

  const handleDelete = (contact) => {
    const confirm = window.confirm(`Are you sure you would like to delete ${contact.name}?`)
    if(confirm){
      contactService.deleteContact(contact).then(() => {
        const filteredContacts = contacts.filter((c) => c.id !== contact.id);
        setContacts(filteredContacts)
        return;
      })
    }
    
  }

  return (
    <div className="contacts-app">
      <h2>Add a New Contact</h2>
      <AddContact handleSubmit={handleSubmit} />

      <h2>Contact List</h2>
      <ContactList contacts={contacts} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;

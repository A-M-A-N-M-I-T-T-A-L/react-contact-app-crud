import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes as Switch, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';
import api from '../api/contacts';

function App() {

  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response;
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter(contact => contact.id !== id);
    setContacts(newContactList);
  }

  useEffect(() => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts)
    //   setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allcontacts = await retrieveContacts();
      if (allcontacts) {
        setContacts(allcontacts.data);
      }
    };

    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    setContacts(contacts.map(c => {
      return c.id === id ? { ...response.data } : c
    }))
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter(contact => {
        return Object.values(contact).join(" ").toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  }

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path='/contact/:id' element={<ContactDetail />} />
          <Route path='/edit' element={<EditContact updateContactHandler={updateContactHandler} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
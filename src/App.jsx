import React, { useState } from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import './App.css';

const App = () => {
  const [featuredContact, setFeaturedContact] = useState({
    name: 'John Doe',
    phone: '123-456-7890',
    email: 'john.doe@example.com'
  });

  const handleSelectContact = (contact) => {
    setFeaturedContact(contact);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <ContactList onSelectContact={handleSelectContact} />
        <ContactDetail contact={featuredContact} />
      </main>
    </div>
  );
};

export default App;
// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactGrid from './components/ContactGrid';
import ContactDetail from './components/ContactDetail';
import contacts from './data/contacts.json';

function App() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isCardView, setIsCardView] = useState(false);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleClearContact = () => {
    setSelectedContact(null);
  };

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <aside className="sidebar">
          {selectedContact ? (
            <ContactDetail contact={selectedContact} onClear={handleClearContact} />
          ) : (
            <p>Ningún contacto seleccionado</p>
          )}
        </aside>
        <main className="main-content">
          <button onClick={toggleView}>
            {isCardView ? 'Vista de Lista' : 'Vista de Tarjetas'}
          </button>
          {isCardView ? (
            <ContactGrid contacts={contacts} />
          ) : (
            <ContactList contacts={contacts} onContactClick={handleContactClick} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
import contacts from '../data/contacts';

const ContactList = ({ onSelectContact }) => {
  const [view, setView] = useState('list');

  const toggleView = () => {
    setView(view === 'list' ? 'cards' : 'list');
  };

  return (
    <div>
      <h2>Contact List</h2>
      <button onClick={toggleView}>
        Toggle View
      </button>
      {view === 'list' ? (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id} onClick={() => onSelectContact(contact)}>
              {contact.name} - {contact.phone}
            </li>
          ))}
        </ul>
      ) : (
        <div className="cards">
          {contacts.map(contact => (
            <div key={contact.id} className="card" onClick={() => onSelectContact(contact)}>
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
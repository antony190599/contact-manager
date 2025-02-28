// src/components/ContactList.jsx
import React from 'react';

import ContactRow from './ContactRow';

const ContactList = ({ contacts, onContactClick }) => {
  return (
    <div className="contact-list">
      <h2>Mis Contactos</h2>
      <ul>
        {contacts.map((contact, index) => (
          <ContactRow key={index} contact={contact} onClick={() => onContactClick(contact)} />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
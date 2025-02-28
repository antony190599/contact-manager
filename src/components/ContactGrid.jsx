
import React from 'react';
import ContactCard from './ContactCard';

const ContactGrid = ({ contacts }) => {
  return (
    <div className="contact-grid">
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};

export default ContactGrid;
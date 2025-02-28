
import React from 'react';
import { getTypeIcon } from '../libs/utils';

const ContactDetail = ({ contact, onClear }) => {
  return (
    <div className="contact-detail">
      <h2>Contacto Destacado</h2>
      <div className="detail-card">
        <h3>
          <span className="contact-type">{getTypeIcon(contact.type)}</span>
          {contact.fullname}
        </h3>
        <p>📱 {contact.phonenumber}</p>
        <p>📧 {contact.email}</p>
        <button onClick={onClear}>Limpiar</button>
      </div>
    </div>
  );
};

export default ContactDetail;
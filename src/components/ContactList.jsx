import PropTypes from 'prop-types';

import ContactRow from './ContactRow';

const ContactList = ({ contacts, onContactClick }) => {
  return (
    <div className="contact-list">
      <ul>
        {contacts.map((contact, index) => (
          <ContactRow key={index} contact={contact} onClick={() => onContactClick(contact)} />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onContactClick: PropTypes.func.isRequired,
};

export default ContactList;
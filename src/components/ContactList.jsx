import PropTypes from 'prop-types';
import ContactRow from './ContactRow';

const ContactList = ({ contacts, onContactClick, selectedContact }) => {
  return (
    <div className="contact-list">
      <ul>
        {contacts.map((contact, index) => (
          <ContactRow
            key={index}
            contact={contact}
            onClick={() => onContactClick(contact)}
            isSelected={selectedContact && selectedContact.fullname === contact.fullname}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onContactClick: PropTypes.func.isRequired,
  selectedContact: PropTypes.object,
};

export default ContactList;
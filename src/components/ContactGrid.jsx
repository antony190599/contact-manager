
import PropTypes from 'prop-types';
import ContactCard from './ContactCard';

const ContactGrid = ({ contacts }) => {
  console.log(contacts);
  return (
    <div className="contact-grid">
      {contacts.map((contact, index) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </div>
  );
};

ContactGrid.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  
};

export default ContactGrid;
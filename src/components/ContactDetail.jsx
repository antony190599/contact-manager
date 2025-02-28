
import { getTypeIcon } from '../libs/utils';
import PropTypes from 'prop-types';

const ContactDetail = ({ contact, onClear }) => {
  return (
    <div className="contact-detail">
      <h3>Contacto Destacado</h3>
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

ContactDetail.propTypes = {
  contact: PropTypes.object.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default ContactDetail;
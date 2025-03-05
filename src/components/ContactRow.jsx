import { getTypeIcon } from "../libs/utils";
import PropTypes from "prop-types";

const ContactRow = ({ contact, onClick, isSelected }) => {
    const { fullname, phonenumber, email, type } = contact;

    return (
        <li className={`contact-row ${isSelected ? 'selected' : ''}`} onClick={onClick}>
            <span className="contact-type">{getTypeIcon(type)}</span>
            <div className="contact-info">
                <span className="contact-name">{fullname}</span>
                <div className="contact-data">
                    <span className="contact-phone">{phonenumber}</span>
                    <span className="contact-mail">{email}</span>
                </div>
            </div>
        </li>
    );
};

ContactRow.propTypes = {
    contact: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};

export default ContactRow;
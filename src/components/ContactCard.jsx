import PropTypes from 'prop-types';

const  ContactCard = ({ contact }) => {
    return (
        <li className="contact-card">
            <div className='contact-card-checkbox'>
                <input type="checkbox" />
            </div>
            <div className='contact-card-info'>
                <div className='contact-card-name'>
                    {contact.fullname}
                </div>
                <div className='contact-card-data'>
                    <span className='contact-card-phone'>
                        {contact.phonenumber}
                    </span>
                    <span className='contact-card-email'>
                        {contact.email}
                    </span>
                </div>
            </div>
            {/* <span className="contact-name">{`${contact?.fullname} | ${contact?.phonenumber}`}</span> */}
        </li>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactCard;


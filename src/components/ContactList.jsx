import ContactRow from './ContactRow'

const ContactList = ({ contacts }) => {
    return (
        <div className="contact-list">
            <h2>Mis Contactos</h2>
            <ul>
                {contacts.map((contact, index) => (
                    <ContactRow 
                        key={index} 
                        contact={contact}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ContactList
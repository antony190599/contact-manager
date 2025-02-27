import { getTypeIcon } from "../libs/utils";

export default function ContactDetail(props) {
    const contact = props.contact;

    return (
        <div className="contact-detail">
            <h2>Contacto Destacado</h2>
            <div className="detail-card">
                <h3><span className="contact-type">{getTypeIcon(contact.type)}</span>{contact.fullname}</h3>
                <p>📱 {contact.phonenumber}</p>
                <p>📧 {contact.email}</p>
                
            </div>
        </div>
    )
}
export default function ContactCard({ nombre, telefono }) {
    return (
        <li className="contact-card">
            <span className="contact-name">{nombre}</span>
            <span className="contact-phone">{telefono}</span>
        </li>
    )
}
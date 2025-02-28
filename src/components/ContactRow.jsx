import React from "react";
import { getTypeIcon } from "../libs/utils";


const ContactRow = ({ contact, onClick }) => {
    const { fullname, phonenumber, email, type } = contact;

    return (
        <li className="contact-row" onClick={onClick}>
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

export default ContactRow;
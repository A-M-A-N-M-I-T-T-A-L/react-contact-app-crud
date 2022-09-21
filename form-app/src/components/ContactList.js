import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const inputElem = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id}  ></ContactCard>
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputElem.current.value)
    }

    return (
        <div className="ui main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button purple right">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input
                        ref={inputElem}
                        type="text"
                        placeholder="Search Contacts"
                        className="prompt"
                        value={props.term}
                        onChange={getSearchTerm} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContactList.length > 0 ? renderContactList : 'No Contacts Available'}
            </div>
        </div>
    );
}

export default ContactList;
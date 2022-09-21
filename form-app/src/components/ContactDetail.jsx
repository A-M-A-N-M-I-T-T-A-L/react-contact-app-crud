import React from "react";
import { useLocation, Link } from "react-router-dom";
import user from "../images/user.png"

const ContactDetail = () => {
    const location = useLocation();
    const { name, email } = location.state.contact;
    // const { id, name, email } = props.contact;
    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt='user' />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to={"/"} >
                    <button className="ui button purple center">
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ContactDetail;
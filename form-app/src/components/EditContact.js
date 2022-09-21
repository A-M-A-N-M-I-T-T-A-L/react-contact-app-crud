import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

function EditContact(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, name, email } = location.state.contact;
    const [state, setState] = useState({
        id: id,
        name: name,
        email: email
    });

    function update(e) {
        e.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All fields are mandatory");
            return;
        }
        props.updateContactHandler(state);
        navigate("/");
    }

    return (
        <div className="ui main">
            <h2>
                Edit Contact
            </h2>
            <form className="ui form" onSubmit={e => update(e)}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name"
                        value={state.name}
                        onChange={e => setState({id, name: e.target.value,email })} />
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email"
                        value={state.email}
                        onChange={e =>  setState({id,name, email: e.target.value })}
                    />
                </div>
                <button className="ui button purple">Update</button>
            </form>
        </div>
    );
}

export default EditContact;
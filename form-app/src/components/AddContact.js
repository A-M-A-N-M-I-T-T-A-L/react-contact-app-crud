import React from "react";
import { Navigate } from 'react-router-dom';
let flag = false;

class AddContact extends React.Component {
    state = {
        name: "",
        email: "",
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.email === "") {
            alert("All fields are mandatory");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({ name: "", email: "" });
        flag = true;
    }

    navigateToHome = () => {
        if (!flag) {
            return null;
        }
        flag = false;
        return (<Navigate to="/" />);
    }

    render() {
        return (
            <div className="ui main">
                <h2>
                    Add Contact
                </h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email"
                            value={this.state.email}
                            onChange={e => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <button className="ui button purple">Add</button>
                    <div>
                        {
                            this.navigateToHome()
                        }
                    </div>
                </form>
            </div>
        );
    }
}

export default AddContact;
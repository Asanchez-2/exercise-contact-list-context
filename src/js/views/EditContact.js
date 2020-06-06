import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useRouteMatch, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const EditContact = () => {
	const { store, actions } = useContext(Context);
	const match = useRouteMatch();
	const history = useHistory();
	const [editName, setName] = useState("");
	const [editPhone, setPhone] = useState("");
	const [editEmail, setEmail] = useState("");
	const [editAddress, setAddress] = useState("");
	useEffect(() => {
		console.log("running useEffect");
		for (let contact of store.allContacts) {
			console.log("checking > ", contact);
			if (contact.id == match.params.contactId) {
				console.log("found it!");
				setName(contact.full_name);
				setPhone(contact.phone);
				setEmail(contact.email);
				setAddress(contact.address);
			}
		}
	}, []);

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit a existent contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							value={editName}
							onChange={e => setName(e.target.value)}
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							defaultValue={editEmail}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							defaultValue={editPhone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							defaultValue={editAddress}
							onChange={e => setAddress(e.target.value)}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={async () => {
							await actions.editContact(
								match.params.contactId,
								editName,
								editPhone,
								editEmail,
								editAddress
							);
							history.push("/");
						}}>
						Update changes
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {};

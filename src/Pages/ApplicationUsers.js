import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function ApplicationUsers(props) {
    const navigate = useNavigate();

    const [application, setApplication] = useState({
        userid: '',
        user_password: '',
        role: ''
    });

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("http://localhost:8080/jpa/customer")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error("Error fetching users:", error));
    };

    const submitUser = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/jpa/customer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        })
            .then(res => {
                if (res.status === 201) {
                    return res.json();
                } else {
                    return null;
                }
            })
            .then(res => {
                if (res !== null) {
                    window.location.reload();
                } else {
                    alert('Failed to create user');
                }
            })
            .catch(error => console.error("Error creating user:", error));
    };

    const handleChange = (e) => {
        setApplication({
            ...application,
            [e.target.name]: e.target.value
        });
    };

    const deleteUser = (uid) => { 
        fetch(`http://localhost:8080/jpa/customer/${uid}`, { 
            method: 'DELETE'
        })
        .then(res => {
            if (res.status === 200) {
                window.location.reload();
            } else {
                throw new Error('Failed to delete user');
            }
        })
        .catch(error => console.error("Error deleting user:", error));
    };

    return (
        <div>
            <Form onSubmit={submitUser}>
                <Form.Label>Create User</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={handleChange} name="userid" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter Password" onChange={handleChange} name="user_password" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter User's Role</Form.Label>
                    <Form.Control type="text" placeholder="Enter User's Role" onChange={handleChange} name="role" />
                </Form.Group>
                <Button variant="primary" type="submit">Create User</Button>
                <Button variant="primary" type="cancel" onClick={() => navigate("/Application")}>Go Back</Button>
            </Form>

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.uid}> 
                            <td>{user.userid}</td>
                            <td>{user.user_password}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="danger" onClick={() => deleteUser(user.uid)}>Delete</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default ApplicationUsers;

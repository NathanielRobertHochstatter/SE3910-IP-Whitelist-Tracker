import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ServerInfoEdit(props) {
    let { id } = useParams();
    let navigate = useNavigate();

    const [serverInfo, setServerInfo] = useState({
        destinationIpAddress: '',
        destinationHostName: '',
        destinationPort: '',
        ipStatus: ''
    });

    const changeValue = (e) => {
        setServerInfo({
            ...serverInfo,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        fetch("http://localhost:8080/serverInfo/" + id, { method: "GET" })
        .then(res => res.json())
        .then(res => setServerInfo(res))
        .catch(error => console.error("Error fetching server info:", error));
    }, [id]);

    const submitEdit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/serverInfo/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serverInfo)
        })
        .then(res => {
            if (res.status === 200) {
                navigate("/User"); ////
            } else {
                throw new Error('Failed to update server info');
            }
        })
        .catch(error => {
            console.error("Error updating server info:", error);
            alert('Failed to update server info');
        });
    }

    return (
        <div>
            <Form onSubmit={submitEdit}>
                <Form.Group controlId="destinationIpAddress">
                    <Form.Label>IP Address</Form.Label>
                    <Form.Control type="text" name="destinationIpAddress" value={serverInfo.destinationIpAddress} onChange={changeValue} />
                </Form.Group>
                <Form.Group controlId="destinationHostName">
                    <Form.Label>Server</Form.Label>
                    <Form.Control type="text" name="destinationHostName" value={serverInfo.destinationHostName} onChange={changeValue} />
                </Form.Group>
                <Form.Group controlId="destinationPort">
                    <Form.Label>Port</Form.Label>
                    <Form.Control type="text" name="destinationPort" value={serverInfo.destinationPort} onChange={changeValue} />
                </Form.Group>
                <Form.Group controlId="ipStatus">
                    <Form.Label>IP Status</Form.Label>
                    <Form.Control type="text" name="ipStatus" value={serverInfo.ipStatus} onChange={changeValue} />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
                <Button variant="secondary" onClick={() => navigate("/User")}>Cancel</Button>
            </Form>
        </div>
    );
}

export default ServerInfoEdit;
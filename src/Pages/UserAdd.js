import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ServerInfoAdd(props) {
  let navigate = useNavigate();

  const [serverInfo, setServerInfo] = useState({
    destinationHostName: '',
    destinationIpAddress: '',
    destinationPort: '',
    ipStatus: '',
    appInfoUid: '' 
  });

  const [appIds, setAppIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/applicationInfo")
      .then(res => res.json())
      .then(res => {
        setAppIds(res); 
      })
      .catch(error => console.error("Error fetching app IDs:", error));
  }, []);

  const changeValue = (e) => {
    setServerInfo({
      ...serverInfo,
      appInfoUid: e.target.value 
    });
  }

  const submitServerInfo = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/serverInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(serverInfo)
    })
      .then(res => {
        if (res.status === 201) {
          navigate("/User");
        } else {
          throw new Error('Failed to add server info');
        }
      })
      .catch(error => {
        console.error("Error adding server info:", error);
        alert('Failed to add server info');
      });
  }

  return (
    <div>
      <Form onSubmit={submitServerInfo}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>App ID</Form.Label>
          <Form.Control as="select" onChange={changeValue} name="appId">
            <option value="">Select an App ID</option>
            {appIds.map(app => (
              <option key={app.appInfoUid} value={app.appInfoUid}>{app.appId}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>IP Address</Form.Label>
          <Form.Control type="text" placeholder="Enter IP Address" onChange={e => setServerInfo({ ...serverInfo, destinationIpAddress: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Server</Form.Label>
          <Form.Control type="text" placeholder="Enter Server Info" onChange={e => setServerInfo({ ...serverInfo, destinationHostName: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Port</Form.Label>
          <Form.Control type="text" placeholder="Enter Port Number" onChange={e => setServerInfo({ ...serverInfo, destinationPort: e.target.value })} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>IP Status</Form.Label>
          <Form.Control type="text" placeholder="Active / Not Active" onChange={e => setServerInfo({ ...serverInfo, ipStatus: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="primary" type="cancel" onClick={() => navigate("/User")}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default ServerInfoAdd;

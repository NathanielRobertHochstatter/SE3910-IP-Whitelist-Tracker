import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ApplicationManage() {
  let navigate = useNavigate();
  const [Applications, setApplications] = useState([]);
  const [Info, setInfo] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedApp, setSelectedApp] = useState('');

  useEffect(() => {
    fetch("http://localhost:8080/jpa/customer", { method: "GET" })
      .then(res => res.json())
      .then(res => {
        setApplications(res);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/applicationInfo", { method: "GET" })
      .then(res => res.json())
      .then(res => {
        setInfo(res);
      });
  }, []);

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleAppChange = (e) => {
    setSelectedApp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedUser && selectedApp) {
      const requestBody = {
        uid: selectedUser,
        appInfoUid: selectedApp,
      };

      fetch("http://localhost:8080/customerapps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then(res => {
          console.log(requestBody);
          console.log(1, res);
          if (res.status === 201) {
            return res.json();
          } else {
            return null;
          }
        })
        .then(res => {
          console.log(res);
          if (res !== null) {
            alert('Data submitted successfully');
          } else {
            alert('Failed to submit data');
          }
        });
    } else {
      alert('Please select a user and an application');
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="userSelect">Select User</label>
      <Form.Select id="userSelect" value={selectedUser} onChange={handleUserChange}>
        <option value="">Select a user</option>
        {Applications.map(app => (
          <option key={app.uid} value={app.uid}>
            {app.userid}
          </option>
        ))}
      </Form.Select>

      <label htmlFor="appSelect">Select Application</label>
      <Form.Select id="appSelect" value={selectedApp} onChange={handleAppChange}>
        <option value="">Select an Application</option>
        {Info.map(app => (
          <option key={app.appInfoUid} value={app.appInfoUid}>
            {app.appId}
          </option>
        ))}
      </Form.Select>

      <Button variant="primary" onClick={handleSubmit}>Add</Button>
      <Button variant="primary" onClick={() => navigate("/Application")}>Cancel</Button>
    </div>
  );
}

export default ApplicationManage;
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
import { useNavigate } from 'react-router-dom';
 
function ApplicationAdd(props) {

    let navigate = useNavigate();

    const[application, setApplications] = useState({
        appId:'',
        appInfoDescription:'',
        });


  const changeValue=(e)=>{
    console.log(e);
    setApplications({
     ...application, [e.target.name]:e.target.value  
    });
    console.log(e.target.appId + " name "  );
    console.log(e.target.appInfoDescription + " value " );
  }

  const submitBook =(e)=>{
    e.preventDefault();
    fetch("http://localhost:8080/applicationInfo", {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(application)
    })
    .then(res=>{
        console.log(1,res);
        if(res.status === 201){
          return res.json();
        }else{
          return null;
        }
      })
    .then(res=>{
      console.log(res)
      if(res!==null){
        navigate("/Application");
    }else{
        alert('fails');
      }
    
    });
  }

  return (
    <div>
<Form onSubmit = {submitBook}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Application ID</Form.Label>
    <Form.Control type="text" placeholder="Enter App ID" onChange = {changeValue} name="appId" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Applcation Info</Form.Label>
    <Form.Control type="text" placeholder="Enter App Info" onChange = {changeValue} name="appInfoDescription"/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit  
  </Button>
  <Button variant="primary" type="cancel" onClick={() => navigate("/Application")}>
    Cancel  
  </Button>
</Form>
    </div>
  );
}

export default ApplicationAdd;

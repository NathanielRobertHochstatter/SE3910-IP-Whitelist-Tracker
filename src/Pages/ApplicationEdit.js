import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

 
function ApplicationEdit(props) {

    let {id} = useParams();

    let navigate = useNavigate();


    const[application, setApplications] = useState({
        appId:'',
        appInfoDescription:'',
      });
    

      //const id=props.match.params.id;
    
      const changeValue=(e)=>{
        console.log(e);
        setApplications({
         ...application, [e.target.name]:e.target.value  
        });
        console.log(e.target.appId + " name "  );
        console.log(e.target.appInfoDescription + " value " );
      }
    
    
      useEffect(()=>{ 
        fetch("http://localhost:8080/applicationInfo/" + id, {method:"GET"})
        .then(res =>res.json())
        .then(res=>{
          setApplications(res)})
          console.log("localhost" + id);
      },[])
    
     // console.log("app info: " + application.appId);
    
      const submitEdit =(e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/applicationInfo/" + id, {
          method:"PUT",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(application)
        })
        .then(res=>{
            console.log(1,res);
            if(res.status === 200){
              console.log(res.json);
              return res.json();
            }else{
              console.log("res " + res.status);
              return null;
            }
          })
        .then(res=>{
          console.log(res)
          if(res !== null){
            navigate("/Application");
          }else{
            alert('fails');
          }
        
        });
    }

  return (
 
    <div>

        <Form onSubmit = {submitEdit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Application ID</Form.Label>
                <Form.Control type="text" placeholder="App ID"   name="appId" onChange = {changeValue} value={application.appId} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Application Description</Form.Label>
                <Form.Control type="text" placeholder="Application Description" onChange = {changeValue}  name="appInfoDescription" value={application.appInfoDescription}/> 
            </Form.Group>

            <Button variant="primary" type="submit">
                Update  
            </Button>
            <Button variant="primary" type="cancel" onClick={() => navigate("/Application")}>
              Cancel  
            </Button>
            </Form>
    </div>
  );
}

export default ApplicationEdit;
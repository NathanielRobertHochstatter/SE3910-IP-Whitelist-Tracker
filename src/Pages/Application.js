
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import Header from '../component/Header';

function Application(props) {


    const[Applications, setApplications] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080/applicationInfo", {method:"GET"})
        .then(res => res.json())
        .then(res=> {setApplications(res);})

         

    },[])

    console.log(Applications);   

 
 
    const DeleteApp =(id)=>{

      console.log("id " +   id)
      fetch('http://localhost:8080/applicationInfo/'+ id,{
        method:'DELETE',
      })
      
      .then(res=>res.text()
      )
    
      .then(res=>{
        if(res==='ok'){     
         // navigate("/");
          window.location.reload();
            
        }else{
        alert('fail');  
        }
      });
    
    }

    let navigate = useNavigate();

    const EditApp =(id)=>{
        console.log("Edit");
        navigate("/AppEdit/" + id);
        
    
    }




  return (
    <div>
      <Header/>
      <Table striped bordered hover variant="light">
      <thead>
        <tr>
          <th>#</th>
          <th>Applcation Id</th>
          <th>Decription</th>
          <th>Created_At</th>
          <th>Created_By</th>
          <th>Modified_At</th>
          <th>Modified_By</th>
          <th>Actions </th>
        </tr>
      </thead>
      <tbody>
        {Applications.map(app => 
        <tr key = {app.appInfoUid}>
          <td>{app.appInfoUid}</td>
          <td>{app.appId}</td>
          <td>{app.appInfoDescription}</td>
          <td>{app.createdAt}</td>
          <td>{app.createdBy}</td>
          <td>{app.modifiedAt}</td>
          <td>{app.modifiedBy}</td>
          <td>
          <Button variant="info"  onClick={()=>EditApp(app.appInfoUid)} >Edit </Button>{' '}  
          <Button variant="success" onClick={()=>DeleteApp(app.appInfoUid)}   >Delete</Button>{' '}
          </td>
        </tr>
        )}

      </tbody>
    </Table>
      <Button variant="primary" onClick={() => navigate("/AppAdd")}>Add</Button>{' '}
      <Button variant="primary" onClick={() => navigate("/AppUsers")}>Manage Users</Button>{' '}
      <Button variant="primary" onClick={() => navigate("/AppManage")}>Manage User Permissions</Button>{' '}
      <Button variant="primary" onClick={() => navigate("/AppServer")}>View Server Info</Button>{' '}
    </div>
  );
}

export default Application;
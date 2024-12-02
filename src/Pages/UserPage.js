import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Line 3: Import XLSX library
import Header from '../component/Header';


function UserPage(props) {
    const [serverInfo, setServerInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/serverInfo", { method: "GET" })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch server info');
                }
            })
            .then(res => setServerInfo(res))
            .catch(error => console.error("Error fetching server info:", error));
    }, []);

    console.log(serverInfo);

    const deleteServerInfo = (id) => {
        console.log("Deleting server info with ID: " + id);
        fetch('http://localhost:8080/serverInfo/' + id, {
            method: 'DELETE',
        })
            .then(res => res.text())
            .then(res => {
                if (res === 'ok') {
                    // Update serverInfo state by filtering out the deleted row
                    setServerInfo(prevServerInfo => prevServerInfo.filter(info => info.serverInfoUid !== id));
                } else {
                    window.location.reload();
                }
            })
            .catch(error => console.error("Error deleting server info:", error));
    }

    const editServerInfo = (id) => {
        console.log("Editing server info with ID: " + id);
        navigate("/UserEdit/" + id);
    }

    const exportToExcel = () => {
        // Prepare the data for export
        const data = [['IP Address', 'Application ID', 'Server', 'Port', 'Date Modified', 'Modified By', 'IP Status']];
        serverInfo.forEach((info) => {
            data.push([
                info.destinationIpAddress,
                info.appInfoUid,
                info.destinationHostName,
                info.destinationPort,
                info.modifiedAt,
                info.modifiedBy,
                info.ipStatus
            ]);
        });

        // Create a new Excel workbook
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Server Info');
        XLSX.writeFile(workbook, 'server_info.xlsx');
    };

    return (
        <div>
            <Header/>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>IP Address</th>
                        <th>Application ID</th>
                        <th>Server</th>
                        <th>Port</th>
                        <th>Date Modified</th>
                        <th>Modified By</th>
                        <th>IP Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {serverInfo.map(info =>
                        <tr key={info.serverInfoUid}>
                            <td>{info.serverInfoUid}</td>
                            <td>{info.destinationIpAddress}</td>
                            <td>{info.appInfoUid}</td>
                            <td>{info.destinationHostName}</td>
                            <td>{info.destinationPort}</td>
                            <td>{info.modifiedAt}</td>
                            <td>{info.modifiedBy}</td>
                            <td>{info.ipStatus}</td>
                            <td>
                                <Button variant="info" onClick={() => editServerInfo(info.serverInfoUid)}>Edit</Button>{' '}
                                <Button variant="success" onClick={() => deleteServerInfo(info.serverInfoUid)}>Delete</Button>{' '}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => navigate("/UserAdd")}>Add</Button>{' '}
            <Button variant="success" onClick={exportToExcel}>Export to Excel</Button> {/* Line 63: Export button */}
        </div>
    );
}

export default UserPage;
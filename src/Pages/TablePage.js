import React, { useState, useEffect } from 'react';
import './TablePageCSS.css';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';

function App({isAdmin}) {
  console.log(isAdmin);
  const nav = useNavigate('/login');
  const [isAdminState, setIsAdminState] = useState(isAdmin);
  useEffect(() => {//manage button for admin, to declare if admin login or user 
    setIsAdminState(isAdmin);
  }, [isAdmin]);

  const [ipRecords, setIpRecords] = useState([
    // Temp records for show 
    { id: 1, ipAddress: '192.168.1.1', applicationId: 'MID', server: 'Example Server 1', port: '8080', dateModified: '2024-03-10' },
    { id: 2, ipAddress: '192.168.1.2', applicationId: 'PUP', server: 'Example Server 2', port: '9090', dateModified: '2024-03-11' },
    { id: 3, ipAddress: '122.118.5.9', applicationId: 'XWR', server: 'Example Server 3', port: '1111', dateModified: '2022-01-11' },
    { id: 4, ipAddress: '612.178.1.7', applicationId: 'ZMP', server: 'Example Server 4', port: '2222', dateModified: '2019-05-11' },
    { id: 5, ipAddress: '292.168.1.1', applicationId: 'MID', server: 'Example Server 5', port: '8080', dateModified: '2024-03-10' },
    { id: 6, ipAddress: '392.168.1.2', applicationId: 'PUP', server: 'Example Server 6', port: '9090', dateModified: '2024-03-11' },
    { id: 7, ipAddress: '522.118.5.9', applicationId: 'WWW', server: 'Example Server 7', port: '1221', dateModified: '2022-01-11' },
    { id: 8, ipAddress: '712.178.1.7', applicationId: 'ZUT', server: 'Example Server 8', port: '3322', dateModified: '2019-05-11' },
  ]);

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showManagePopup, setShowManagePopup] = useState(false);
  const [user, setUser] = useState('');
  const [applicationIds, setApplicationIds] = useState('');
  const [assignedIds, setAssignedIds] = useState({});

  const handleManageClick = () => {
    setShowManagePopup(true);
  };

  const handleManageConfirm = () => {
    // Save the assigned IDs to the component state
    setAssignedIds((prevAssignedIds) => ({
      ...prevAssignedIds,
      [user]: applicationIds.split(',').map((id) => id.trim()), // Assuming IDs are comma-separated
    }));
    setShowManagePopup(false);
  };

  const handleManageCancel = () => {
    setShowManagePopup(false);
  };

  const handleEdit = (record) => {
    console.log("edit");
    setSelectedRecord(record);
    setShowAddEditModal(true);
  };

  const handleConfirmEdit = (editedRecord) => {
    setIpRecords((prevRecords) =>
      prevRecords.map((record) => (record.id === editedRecord.id ? editedRecord : record))
    );
    setSelectedRecord(null);
    setShowAddEditModal(false);
    console.log("confirm edit");
  };

  const handleCancelEdit = () => {
    console.log("Cancel edit");
    setSelectedRecord(null);
    setShowAddEditModal(false);
  };

  const handleDelete = (id) => {
    console.log(`Delete record with id ${id}`);
    setIpRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
  };

  const handleAdd = () => {//event handler for add row button 
    const newRecord = {
      id: ipRecords.length + 1,
      ipAddress: '',
      applicationId: '',
      server: '',
      port: '',
      dateModified: new Date().toISOString().split('T')[0],
    };
    setIpRecords((prevRecords) => [...prevRecords, newRecord]);
    setSelectedRecord(newRecord);
    setShowAddEditModal(true);
  };

  const handleLogout = () => {
    console.log("Logout");
    nav('/login');
  };

  return (
    <div className="App">
      <div className="logout-button-container">
        {isAdminState && (<button className="manage-button" onClick={handleManageClick}>Manage</button>)}    
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <h1>Whitelist</h1>
      <IpRecordsTable ipRecords={ipRecords} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />

      {showAddEditModal && (
        <AddEditRecordModal
          record={selectedRecord}
          onClose={handleCancelEdit}
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
        />
      )}
      {showManagePopup && (
        <ManagePopup
          users={['BlueMoose123', 'HanusTheSpider456']}
          selectedUser={user}
          setSelectedUser={setUser}
          applicationIds={applicationIds}
          setApplicationIds={setApplicationIds}
          onConfirm={handleManageConfirm}
          onCancel={handleManageCancel}
        />
      )}
    </div>
  );

  function ManagePopup({ users, selectedUser, setSelectedUser, onConfirm, onCancel }) {
    const userIdsForUser = assignedIds[user] || [];
    const [userIds, setUserIds] = useState(userIdsForUser.map((id) => ({ id })));
    const [newApplicationId, setNewApplicationId] = useState('');
  
    // Function to fetch and update the IDs assigned to the selected user
    const fetchUserIds = () => {
        // Here you would fetch the IDs assigned to the selected user from your data source
        // For now, let's assume we have a hardcoded list of IDs for demonstration purposes
        const hardcodedUserIds = [
            { id: 1, applicationId: 'MID' },
            { id: 2, applicationId: 'PUP' },
            { id: 3, applicationId: 'XWR' },
        ];
        // Filter the IDs based on the selected user
        const filteredIds = hardcodedUserIds.filter((id) => id.applicationId === selectedUser);
        // Update the state with the filtered IDs
        setUserIds(filteredIds);
    };
  
    useEffect(() => {
        // Fetch the IDs when the selected user changes
        fetchUserIds();
        // eslint-disable-next-line
    }, [selectedUser]);
  
    const handleAddApplicationId = () => {
        if (newApplicationId) {
            setUserIds([...userIds, { id: userIds.length + 1, applicationId: newApplicationId }]);
            setNewApplicationId('');
        }
    };
  
    const handleDeleteApplicationId = (id) => {
        setUserIds(userIds.filter((userId) => userId.id !== id));
    };
  
    const handleConfirm = () => {
        // Split the applicationIds string into an array
        const appIdsArray = userIds.map((userId) => userId.applicationId);
        // Call the onConfirm function with the selected user and the array of application IDs
        onConfirm(selectedUser, appIdsArray);
    };
  
    const handleCancel = () => {
        // Call the onCancel function
        onCancel();
    };
  
    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Manage</h2>
                <label>
                    User:
                    <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        {users.map((user) => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                </label>
                {/* Display the bordered box with the column of current IDs */}
                <div className="user-ids-box">
                    <h3>Current IDs</h3>
                    <ul>
                        {userIds.map((userId) => (
                            <li key={userId.id}>
                                {userId.applicationId}
                                <button style={{ border: 'none', margin: 10, background: 'lightgrey', color: 'inherit', padding: 1, cursor: 'pointer' }} onClick={() => handleDeleteApplicationId(userId.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <label>
                    Add Application ID:
                    <input type="text" value={newApplicationId} onChange={(e) => setNewApplicationId(e.target.value)} />
                    <button onClick={handleAddApplicationId}>Add</button>
                </label>
                <button onClick={handleConfirm}>Confirm</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
  }
}

const IpRecordsTable = ({ ipRecords, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [serverStatus, setServerStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState({ column: null, order: 'asc' });

  const recordsPerPage = 8;
  const totalPages = Math.ceil(ipRecords.length / recordsPerPage);

  const toggleServerStatus = (id) => {
    setServerStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the status of the server
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when search query changes
  };

  const handleSort = (column) => {
    setSortCriteria((prevCriteria) => ({
      column,
      order: prevCriteria.column === column && prevCriteria.order === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1); // Reset pagination when sorting criteria changes
  };

  const exportToExcel = () => {//event handler for export button
    // Prepare the data for export
    const data = [['IP Address', 'Application ID', 'Server', 'Port', 'Date Modified', 'Status']];
    ipRecords.forEach((record) => {
      data.push([
        record.ipAddress,
        record.applicationId,
        record.server,
        record.port,
        record.dateModified,
        serverStatus[record.id] ? 'Active' : 'Inactive'
      ]);
    });

    // Create a new Excel workbook
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'IP Records');
    XLSX.writeFile(workbook, 'ip_records.xlsx');
  };

  const nextPage = () => {//event handler for next page button 
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {//event handler for prev page button 
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Filter records based on search
  let filteredRecords = ipRecords.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sort records based on sort
  if (sortCriteria.column) {
    filteredRecords.sort((a, b) => {
      const compareA = a[sortCriteria.column];
      const compareB = b[sortCriteria.column];
      if (sortCriteria.order === 'asc') {
        return compareA.localeCompare(compareB);
      } else {
        return compareB.localeCompare(compareA);
      }
    });
  }

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = filteredRecords.slice(startIndex, endIndex);

  return (
    <div className="table-container">
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th className="clickable-header" onClick={() => handleSort('ipAddress')}>IP Address</th>
            <th className="clickable-header" onClick={() => handleSort('applicationId')}>Application ID</th>
            <th className="clickable-header" onClick={() => handleSort('server')}>Server</th>
            <th className="clickable-header" onClick={() => handleSort('port')}>Port</th>
            <th className="clickable-header" onClick={() => handleSort('dateModified')}>Date Modified</th>
            <th>Actions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.ipAddress}</td>
              <td>{record.applicationId}</td>
              <td>{record.server}</td>
              <td>{record.port}</td>
              <td>{record.dateModified}</td>
              <td>
                <button className="action-button" onClick={() => onEdit(record)}>Edit</button>
                <button className="action-button" onClick={() => onDelete(record.id)}>Delete</button>
              </td>
              <td>
                <button
                  className={serverStatus[record.id] ? 'active-button' : 'inactive-button'}
                  onClick={() => toggleServerStatus(record.id)}
                >
                  {serverStatus[record.id] ? 'Active' : 'Inactive'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>{"<"}</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>{">"}</button>
      </div>
      <button onClick={onAdd}>Add New Record</button>
      <button onClick={exportToExcel} className="export-button">Export to Excel</button>
    </div>
  );
};

function AddEditRecordModal({ record, onClose, onConfirm, onCancel }) {
  const [editedRecord, setEditedRecord] = useState({ ...record });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecord((prevRecord) => ({ ...prevRecord, [name]: value }));
  };

  const handleConfirm = () => {//event handler for confirm button 
    if (editedRecord.ipAddress && editedRecord.applicationId && editedRecord.server && editedRecord.port) {
      onConfirm(editedRecord);
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{record ? 'Edit Record' : 'Add New Record'}</h2>
        <label>
          IP Address:
          <input type="text" name="ipAddress" value={editedRecord.ipAddress} onChange={handleChange} />
        </label>
        <label>
          Application ID:
          <input type="text" name="applicationId" value={editedRecord.applicationId} onChange={handleChange} />
        </label>
        <label>
          Server:
          <input type="text" name="server" value={editedRecord.server} onChange={handleChange} />
        </label>
        <label>
          Port:
          <input type="text" name="port" value={editedRecord.port} onChange={handleChange} />
        </label>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
export default App;
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import TablePage from './Pages/TablePage';
import Header from './component/Header';
import Application from './Pages/Application';
import ApplicationEdit from './Pages/ApplicationEdit';
import ApplicationAdd from './Pages/ApplicationAdd';
import ApplicationManage from './Pages/ApplicationManage';
import ApplicationServerInfo from './Pages/ApplicationServerInfo';
import UserPage from './Pages/UserPage';
import ServerInfoEdit from './Pages/UserEdit';
import ServerInfoAdd from './Pages/UserAdd';
import ApplicationUsers from './Pages/ApplicationUsers';

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLoginSuccess = (admin) => {

        setIsAdmin(admin);
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/Login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/Table" element={<TablePage isAdmin={isAdmin}/>} />
                    <Route path="/Application" exact={true} Component={Application}/>
                    <Route path="/AppAdd" exact={true} Component={ApplicationAdd}/>
                    <Route path="/AppEdit/:id" exact={true} Component={ApplicationEdit}/>
                    <Route path="/AppManage" exact={true} Component={ApplicationManage}/>
                    <Route path="/AppServer" exact={true} Component={ApplicationServerInfo}/>
                    <Route path="/AppUsers" exact={true} Component={ApplicationUsers}/>
                    <Route path="/User" exact={true} Component={UserPage}/>
                    <Route path="/UserEdit/:id" exact={true} Component={ServerInfoEdit}/>
                    <Route path="/UserAdd" exact={true} Component={ServerInfoAdd}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
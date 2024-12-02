import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPageCSS.css'; 

function LoginPage({ onLoginSuccess }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdminLogin, setIsAdminLogin] = useState(false); // State to track the current login mode

    const handleSubmit = async (e) => {
        e.preventDefault();
        let messages = [];

        if (isAdminLogin) {
            const response = await fetch('http://localhost:8080/jpa/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: adminUsername,
                    user_password: adminPassword
                })
            });

            if (response.status === 200) {
                onLoginSuccess(true);
                navigate('/Application');
                return;
            } else {
                console.log(response.status);
                messages.push('Invalid admin credentials');
            }
        } else {
            const response = await fetch('http://localhost:8080/jpa/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userid: name,
                    user_password: password
                })
            });

            if (response.status === 200) {
                onLoginSuccess();
                navigate('/User');
                return;
            } else {
                console.log(response.status);
                messages.push('Invalid Username or Password');
            }
        }

        if (messages.length > 0) {
            setError(messages.join(', '));
        } else {
            setError('');
        }
    };


    return (
        <div className="App">
            <div className="stripe green-stripe"></div>
            <header className="App-header">
                <h1>Commerce Bank Login</h1>
            </header>
            <div className="stripe green-stripe"></div>
            <div className="App-body">
                {/* Regular User Login */}
                {!isAdminLogin && (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>Username:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="username" />
                        </label>
                        <label>Password:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                        </label>
                        <button type="submit">Log In</button>
                    </form>
                )}
                {/* Admin Login */}
                {isAdminLogin && (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Admin Login</h2>
                        <label>Username:
                            <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} name="adminUsername" />
                        </label>
                        <label>Password:
                            <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} name="adminPassword" />
                        </label>
                        <button type="submit">Log In as Admin</button>
                    </form>
                )}
                <p>
                    Please enter a valid user or admin login
                </p>
                <div id="error" className="error">{error}</div>
                {/* Toggle button to switch between regular user and admin login */}
                <button onClick={() => setIsAdminLogin(!isAdminLogin)}>
                    {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
                </button>
            </div>
            <div className="stripe green-stripe"></div>
        </div>
    );
}

export default LoginPage;

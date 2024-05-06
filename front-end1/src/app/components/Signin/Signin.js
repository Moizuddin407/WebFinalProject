// Signin.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link , useNavigate} from 'react-router-dom';
import Mainpage from '../Management/Mainpage';

export default function Signin() {

    const API_BASE = 'http://localhost:4003/users';

    const [dataCred, setDataCred] = useState([]);
    const [emailid, setemailId] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        GetTodos();
    }, []);


    const GetTodos = () => {
        fetch(API_BASE)
            .then(res => res.json())
            .then(dataCred => {
                // Log every record received
                console.log("Data Received:", dataCred);
    
                // Assuming setDataCred is a state updater function
                setDataCred(dataCred);
            })
            .catch(err => console.log(err));
    }
    

    const handleemailIdChange = (event) => {
        setemailId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const login = async () => {
        try {
            const response = await fetch(`${API_BASE}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailid, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Determine redirection based on user role
                switch (data.role) {
                    case 'society':
                        navigate('/society');
                        break;
                    case 'management':
                        navigate('/Mainpage');
                        break;
                    case 'mentor':
                        navigate('/Mentor');
                        break;
                    default:
                        // Redirect to default page if role is not recognized
                        navigate('/DefaultPage');
                        break;
                }
                // Store role in localStorage or state for future use
                localStorage.setItem('role', data.role);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };
    
    

    return (
        <div>
            <div className="Signin-page">
                <div className="container Signin-Form-Design">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="id" placeholder="ID" value={emailid} onChange={handleemailIdChange} />
                        <label htmlFor="id">ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button onClick={login}>Login</button>
                    <button className="button">
                        <Link className="linkxxx" to="/Signup">Sign Up</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

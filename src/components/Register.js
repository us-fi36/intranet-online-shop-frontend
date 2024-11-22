import React, { useState } from 'react';
import '../App.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');


    const handleRegister = () => {
        fetch('http://em.mshome.net:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, name, email, password }),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch(error => console.error('Error registering:', error));
    };

    return (
        <div className='container'>
            <h1>Register</h1>
            <input
                className='username'
                id="username"
                type='username'
                name="username"
                placeholder="Benutzername"
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
            />
            <br />
            <input
                className='username'
                id='name'
                type='name'
                name="name"
                placeholder="Name"
                onChange={e => setName(e.target.value)}
                autoComplete="email"
                required />
            <br />
            <input
                className='username'
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <input
                className='username'
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <button className='login' onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;

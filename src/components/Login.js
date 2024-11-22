import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login({ isLoggedIn, setIsLoggedIn }) {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        try {
            const response = await fetch('http://em.mshome.net:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            const data = await response.json();

            if (response.ok) {

                localStorage.setItem('token', data.token); // Speichert das Token
                localStorage.setItem('userId', data.userId);  // userId speichern
                setMessage('Erfolgreich eingeloggt!');
                // setIsLoggedIn(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage(data.message || 'Login fehlgeschlagen');
            }

        } catch (error) {
            console.error("Fehler beim Login:", error);
            setMessage("Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
        }
    };

    return (
        <div className='container'>
            <h3>Herzlich willkommen.</h3>
            <h3 className='login_h3'>{isLoggedIn ? 'Sie sind eingeloggt!' : 'Bitte einloggen'}</h3>
            {message && <h4 className='login_h4'>{message}</h4>}
            {isLoggedIn ?
                '' :
                <form onSubmit={handleLogin}>
                    <h5 className='login_h5'>Email:</h5> <input className='username' type="text" name="email" required />
                    <br />
                    <h5 className='login_h5'>Passwort:</h5> <input className='password' type="password" name="password" required />
                    <br />
                    <button className='login' type="submit">Anmelden</button>
                </form>
            }
        </div>
    );
};

export default Login;

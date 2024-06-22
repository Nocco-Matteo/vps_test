import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Importa il file CSS per lo stile

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const response = await fetch('http://172.21.0.3:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const userData = await response.json();
                setMessage('Registration successful');
                setTimeout(() => {
                    navigate('/profile', { state: { user: userData } });
                }, 2000); // Attendi 2 secondi prima di reindirizzare
            } else {
                setMessage('Registration failed');
                setTimeout(() => setMessage(''), 2000); // Resetta il messaggio dopo 2 secondi
            }
        } catch (error) {
            setMessage('Error occurred');
            console.error('Errore:', error);
            setTimeout(() => setMessage(''), 2000); // Resetta il messaggio dopo 2 secondi
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : message || 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Register;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Profile.css'; // Importa il file CSS per lo stile

const Profile = () => {
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();

    if (!user) {
        return <div>Errore: Dati utente non disponibili</div>;
    }

    const handleLogout = () => {
        // Rimuovi i dati dell'utente dallo stato globale o dal localStorage
        // localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="profile-container">
            <h1>Profilo Utente</h1>
            <p><strong>Email:</strong> {user.email}</p>
            {/* Aggiungi ulteriori dati utente se necessario */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;

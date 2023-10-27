import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { token, userId } = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchWithToken = async (endpoint, callback, method = 'GET', body) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            
            if (response.ok) {
                const parsed = await response.json();
                callback(parsed);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const fetchData = async () => {
        fetchWithToken(`/user/${userId}`, (data) => {
            setUserName(data.userName);
            setEmail(data.email);
            setImage(data.image);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if (userId) { 
            fetchData();
        }
    }, [userId]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!userId) {
        navigate('/login');
        return null;
    }

    return (
        <div>
            <h1>My Profile</h1>
            <img src={image} alt={userName} style={{ width: '100px', height: '100px' }} />
            <p>UserName: {userName}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default ProfilePage;

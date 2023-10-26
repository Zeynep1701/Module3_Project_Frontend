import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const { fetchWithToken, isLoading, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchWithToken('/user/profile');
      if (userData) {
        setUserName(userData.userName);
        setEmail(userData.email);
        setImage(userData.image);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchWithToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!isAuthenticated) {
    navigate("/login");
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

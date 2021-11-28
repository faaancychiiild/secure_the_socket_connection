import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import requests from '../axios';

const HomePage = () => {
    let [userCount, setUserCount] = useState();
    let navigate = useNavigate();
    let token = useSelector(state => state.access_token);
    let userEmail = useSelector(state => state.email);

    useEffect(() => {
        // if(!token) navigate('/log_in');
        requests.fetchUserCount();
        
        //setup event-sent connection between client and server
        const eventsrc = new EventSource('http://localhost:4000/fetch/users');
        eventsrc.onmessage = e => setUserCount(e.data);
        //cleanup function for useEffect hook
        return () => {
            eventsrc.close();
        }
    }, [token, navigate]);
    
    return (
        <div>
            <h2>Welcome</h2>
            <h3>{userEmail}</h3>
            <h3>Total: {userCount} users</h3>
        </div>
    );
}

export default HomePage;
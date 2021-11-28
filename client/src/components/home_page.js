import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import requests from '../axios';

const HomePage = () => {
    let [userCount, setUserCount] = useState();
    let navigate = useNavigate();
    let token = JSON.parse(localStorage.getItem('authState')).access_token;
    let refresh = JSON.parse(localStorage.getItem('authState')).refresh_token;
    let logs = useSelector(state => state.logCount);
    let userEmail = useSelector(state => state.email);

    useEffect(() => {
        requests.verifyAccess(token, userEmail, refresh).then(res => {
            if(res.data){
                let currentState = JSON.parse(localStorage.getItem('authState'));
                localStorage.setItem('authState', {...currentState, access_token: res.data})
            }
            if(res.status === 403){
                navigate('/log_in');
            }
        });
        // if(!token) navigate('/log_in');
        requests.fetchUserCount();
        
        //setup event-sent connection between client and server
        const eventsrc = new EventSource('http://localhost:4000/fetch/users');
        eventsrc.onmessage = e => {
            setUserCount(e.data)
        };
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
            <h3>Total: {logs} logs</h3>
        </div>
    );
}

export default HomePage;
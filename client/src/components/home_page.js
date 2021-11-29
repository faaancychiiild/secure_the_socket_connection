import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import io from 'socket.io-client';
import requests from '../axios';
import '../App.css';

let socket;

const HomePage = () => {
    let [userCount, setUserCount] = useState();
    let navigate = useNavigate();
    let storage = JSON.parse(localStorage.getItem('authState'));
    //Declare tokens and give them values later
    let access_token, refresh_token;
    //check the localStorage
    if(storage){
        [access_token, refresh_token] = [storage.access_token, storage.refresh_token];
    }
    let logs = useSelector(state => state.logCount);
    let userEmail = useSelector(state => state.email);

    useEffect(() => {

        if(!access_token || !refresh_token || !userEmail){
            navigate('/log_in');
            return;
        }
        requests.fetchPageStats(access_token, userEmail, refresh_token)
            .then(res => {
                if(!res) navigate('/log_in');
                setUserCount(res.data);
            })
            .catch(err => {
                navigate('/log_in');
        });
        //setup socket connection between clients and server
        socket = io('http://localhost:4000');
        socket.emit('joined', 'authRoom');
        socket.on('registered', () => setUserCount(userCount++));
        //cleanup function for useEffect hook
        return () => {
            socket.off();
        }
    }, [access_token, navigate, userEmail, refresh_token, userCount]);

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.setItem('authState', "{}");
        navigate('/log_in');
    }
    
    return (
        <section>
            <Button onClick={handleClick} margin="normal" variant='contained' className='form-btn float-right'>Log Out</Button>
            <h2>Welcome {userEmail} </h2>
            <div className="page-stats">
                <h2>Page Stats</h2>
                <h3>Total: {userCount} users</h3>
                <h3>Total: {logs} logs</h3>
            </div>
        </section>
    );
}

export default HomePage;
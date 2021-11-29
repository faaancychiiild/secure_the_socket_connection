import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetUserCount } from '../redux/action_creators';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import io from 'socket.io-client';
import requests from '../axios';
import '../App.css';

let socket;

const HomePage = () => {
    let dispatch = useDispatch();
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
    let userCount = useSelector(state => state.userCount);

    useEffect(() => {

        if(!access_token || !refresh_token || !userEmail){
            navigate('/log_in');
            return;
        }
        requests.fetchPageStats(access_token, userEmail, refresh_token)
            .then(res => {
                if(!res) navigate('/log_in');
                dispatch(SetUserCount(res.data));
            })
            .catch(err => {
                navigate('/log_in');
        });
        //setup socket connection between clients and server
        socket = io('http://localhost:4000');
        socket.emit('joined', 'authRoom');
        socket.on('registered', () => {
            dispatch(SetUserCount(userCount+=1));
            if(userCount > 3) alert("You're a lucky person :)")
        });
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

    const handleLogs = () => {
        if(logs % 10 === 1) return `${logs}st`;
        if(logs % 10 === 2) return `${logs}nd`;
        if(logs % 10 === 3) return `${logs}rd`;
        return `${logs}th`;
    }
    
    return (
        <>
            <div className="header">
                <p className="welcome">Welcome {userEmail} </p>
                <Button className="logout" onClick={handleClick} margin="normal" variant='contained' className='form-btn float-right'>Log Out</Button>
            </div>
            <section className="stats">
                <div className="page-stats">
                    <h2>Website Stats</h2>
                    <h3>Total: {userCount} users</h3>
                </div>
                <div className="page-stats">
                    <h2>Your Stats</h2>
                    <h3>It's your { handleLogs() } log</h3>
                </div>
            </section>
        </>
    );
}

export default HomePage;
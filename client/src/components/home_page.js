import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate();
    let isLoggedIn = useSelector(state => state.logged_in);
    let userEmail = useSelector(state => state.email);
    useEffect(() => {
        if(!isLoggedIn) navigate('/log_in');
        return;
    }, [isLoggedIn]);
    return (
        <div>
            <h2>Welcome</h2>
            <a>{userEmail}</a>
        </div>
    );
}

export default HomePage;
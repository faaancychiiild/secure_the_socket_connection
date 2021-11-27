import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    let navigate = useNavigate();
    let isLoggedIn = useSelector(state => state.logged_in);
    useEffect(() => {
        if(!isLoggedIn) navigate('/log_in');
    }, [isLoggedIn]);

    return (
        <div>
            
        </div>
    );
}

export default HomePage;
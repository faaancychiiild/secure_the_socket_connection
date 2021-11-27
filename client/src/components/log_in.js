import '../App.css'
import { FormControl, Button, InputLabel, Input } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LogIn, SetEmail } from '../redux/action_creators';
import { useEffect } from 'react';
import requests from '../axios';

const LogInPage = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.logged_in);
    
    useEffect(() => {
        if(isLoggedIn) navigate('/');
    }, [isLoggedIn]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let {email, password} = e.target.elements;

        requests.login({
            "email": email.value,
            "password": password.value
        }).then((res) => {
            if(res.status === 200) {
                dispatch(LogIn()) && dispatch(SetEmail(email.value)) && navigate('/');
                localStorage.setItem('authState', JSON.stringify({
                    "email": email.value,
                    "logged_in": true
                }));
            }
        }).catch((ex) => console.log(ex.message));
        
    }
    
    return (
    <div className="App">
        <form onSubmit={handleSubmit} className='form-control'>
            <h4 className="form-heading">Log In</h4>
            <FormControl required className='form-elements' margin="dense">
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input name="email" type="email" placeholder="Email" id="email" className='input-element'/>
            </FormControl>
            <FormControl required className='form-elements' margin="dense">
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input name="password" type="password" placeholder="Password" id='password' className='input-element'/>
            </FormControl>
            <div className="form-btns">
                <Button margin="normal" variant='contained' type="submit" className='form-btn'>Log In</Button>
                <Button onClick={() => navigate('/sign_up')} margin="dense" variant='contained' className='form-btn'>Sign Up</Button>
            </div>
        </form>
    </div>
    );
}

export default LogInPage;
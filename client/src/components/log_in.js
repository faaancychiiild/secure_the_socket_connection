import '../App.css'
import { FormControl, Button, InputLabel, Input } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CountLogs, SetEmail } from '../redux/action_creators';
import requests from '../axios';

const LogInPage = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let {email, password} = e.target.elements;

        requests.login({
            "email": email.value,
            "password": password.value
        }).then((res) => {
            if(res.status === 200) {
                let {access_token, refresh_token } = res.data;
                //localStorage updated with tokens
                localStorage.setItem('authState', JSON.stringify({
                    "email": email.value,
                    access_token,
                    refresh_token
                }));
                dispatch(CountLogs(res.data.logCount)) && dispatch(SetEmail(email.value)) && navigate('/');
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
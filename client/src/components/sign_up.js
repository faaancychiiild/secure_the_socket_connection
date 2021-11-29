import '../App.css'
import { FormControl, Button, InputLabel, Input } from "@material-ui/core";
import requests from '../axios';
import { useDispatch } from 'react-redux';
import { SetEmail, CountLogs } from '../redux/action_creators';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let { username, email, password } = e.target.elements;

        requests.register({
            "username": username.value,
            "email": email.value,
            "password": password.value
        }).then((res) => {
            if (res.status === 200) {
                let { access_token, refresh_token } = res.data;
                localStorage.setItem('authState', JSON.stringify({
                    email: email.value,
                    access_token,
                    refresh_token,
                    logCount: res.data.logCount
                }));
                dispatch(SetEmail(email.value)) && dispatch(CountLogs(res.data.logCount)) && navigate('/');
            }
        }).catch((ex) => console.log(ex.message));

    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit} className='form-control'>
                <h4 className="form-heading">Sign Up</h4>
                <FormControl required className='form-elements' margin="dense">
                    <InputLabel htmlFor='username'>Username</InputLabel>
                    <Input name="username" type="text" placeholder="Username" id='username' className='input-element' />
                </FormControl>
                <FormControl required className='form-elements' margin="dense">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input name="email" type="email" placeholder="Email" id="email" className='input-element' />
                </FormControl>
                <FormControl required className='form-elements' margin="dense">
                    <InputLabel htmlFor='password'>Password</InputLabel>
                    <Input name="password" type="password" placeholder="Password" id='password' className='input-element' />
                </FormControl>
                <div className="form-btns">
                    <Button margin="normal" variant='contained' type="submit" className='form-btn'>Sign Up</Button>
                    <Button onClick={() => navigate('/log_in')} margin="dense" variant='contained' className='form-btn'>Log in</Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpPage;
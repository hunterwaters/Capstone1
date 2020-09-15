import React, {useState, useContext} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';
import {AuthContext} from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({username : "", password : ""});
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onChange = e => {
        setUser({...user,[e.target.name] : e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
                const { isAuthenticated, user, message } = data;
                if(isAuthenticated) {
                    authContext.setUser(user);
                    authContext.setIsAuthenticated(isAuthenticated);
                    props.history.push('/todos');
                }
                else 
                    setMessage(message);
        })
    }

    return (
        <div className = "login-container">
            <form onSubmit={onSubmit}>
                <h3>Please Sign In</h3>
                <label htmlFor ="username" className = "username-label">Username:</label>
                <input type = "text" name = "username" onChange={onChange} className = "username" placeholder = "Enter Username" />
                <label htmlFor ="password" className = "password-label">Password:</label>
                <input type = "password" name = "password" onChange={onChange} className ="password" placeholder = "Enter Password" />
                <br />
                <br />
                <button className = "login-button" type = "submit">Log In</button>
            </form>
                {message ? <Message message={message} /> : null } 
        </div>
    )
}

export default Login;

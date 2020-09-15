import React, {useState,useRef,useEffect} from 'react';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props=>{
    const [user,setUser] = useState({username: "", password : "", role : ""});
    const [message,setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(()=>{
        return ()=>{
            clearTimeout(timerID);
        }
    },[]);

    const onChange = e =>{
        setUser({...user,[e.target.name] : e.target.value});
    }

    const resetForm = ()=>{
        setUser({username : "", password : "",role : ""});
    }

    const onSubmit = e =>{
        e.preventDefault();
        AuthService.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timerID = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }

    return(
        <div className = "register-container">
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="username-label">Username: </label>
                <input type="text" 
                       name="username" 
                       value={user.username}
                       onChange={onChange} 
                       className="username" 
                       placeholder="Enter Username"/>
                <label htmlFor="password" className="password-label">Password: </label>
                <input type="password" 
                       name="password"
                       value={user.password} 
                       onChange={onChange} 
                       className="password" 
                       placeholder="Enter Password"/>
                <label htmlFor="role" className="role-label">Role: </label>
                <input type="text" 
                       name="role"
                       value={user.role}  
                       onChange={onChange} 
                       className="role" 
                       placeholder="Enter role (admin/user)"/>
                       <br />
                       <br />
                <button className="register-button" 
                        type="submit">Register</button>
            </form>
            {message ? <Message message={message}/> : null}
        </div>
    )
}

export default Register;
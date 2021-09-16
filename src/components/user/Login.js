import { useState } from 'react';
import Layout from '../Layout';
import loginImg from '../../assests/img/login.PNG';
import { Link,Redirect } from 'react-router-dom';
import './user-form.css'
import { showError, showLoading } from '../../utils/message';
import { login } from '../../api/apiAuth'
import { authenticate, isAuthenticated } from '../../utils/auth';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: false,
        loading: false,
        disabled: false,
        redirect: false
    });

    const { email, password, loading, error, disabled, redirect } = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true, disbled: true })
        login({email, password })
            .then(response => {
                authenticate(response.data.token,()=>{
                    setValues({
                        email: '',
                        password: '',
                        success:true,
                        disabled:false,
                        loading:false,
                        redirect:true,
                    })
                })
            })
            .catch(err=>{
                let errMsg='Something went wrong!'
                if(err.response){
                    errMsg=err.response.data;
                }else{ 
                    errMsg='Something went wrong!'
                }
                setValues({...values,error:errMsg,disabled:false,loading:false})
            })
    }

    const signInForm = () => (
        <div className="form-body">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <img className="img" src={loginImg} alt="Image" />
                </div>
                <div className="form-desc col-sm-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h1 className="header">Login</h1>
                        <div className="form-group">
                            <i className="fa fa-user input-icon" aria-hidden="true"></i>
                            <input name='email' type="email" className="no-outline" placeholder="Enter your email" value={email} required onChange={handleChange}/>
                            <hr className="hr"/>
                        </div>
                        <div className="form-group">
                            <i className="fa fa-lock input-icon" aria-hidden="true"></i>
                            <input className="no-outline" type="password" placeholder="Password" name="password" value={password} onChange={handleChange}/>
                            <hr className="hr"/>
                        </div>
                        <button type="submit" className="submit-btn">Login</button>
                        <Link to="/register" className="account">Create a new account</Link> 
                    </form>
                </div>
            </div>
        </div>
    );
    const redirectUser=()=>{
        if(redirect) return <Redirect to="/"/>
        if(isAuthenticated()) return <Redirect to="/"/>
    }
    return (
        <Layout title="Login">
            {redirectUser()}
            {showLoading(loading)}
            {showError(error,error)}
            {signInForm()}
        </Layout>
    );
}

export default Login;

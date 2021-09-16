import { useState } from 'react';
import Layout from '../Layout';
import { Link,Redirect } from 'react-router-dom';
import regImg from '../../assests/img/registration.PNG';
import {register} from '../../api/apiAuth';
import {showError,showLoading} from '../../utils/message'
import './user-form.css'
import { isAuthenticated } from '../../utils/auth';

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phoneNo:'',
        password: '',
        error: false,
        loading: false,
        success: false
    });

    const { name, email, phoneNo, password, loading, error, success } = values;

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, error: false,loading: true})
        register({ name, email, phoneNo, password })
            .then(response => {
                setValues({
                    name: '',
                    email: '',
                    phoneNo:'',
                    password: '',
                    success:true,
                    loading:false
                })
            })
            .catch(err=>{
                let errMessage='Something went wrong!'
                if(err.response){
                    errMessage=err.response.data
                }else{
                    errMessage='Something went wrong!'
                }
                setValues({...values,error:errMessage,loading:false})
            })
    }
    const signInForm = () => (
        <div className="form-body">
            <div className="row">
                <div className="image col-sm-12 col-md-6">
                    <img className="img" src={regImg} alt="Image" />
                </div>
                <div className="form-desc col-sm-12 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <h3 class="header">Create Account</h3>
                        <div className="form-group">
                            <label className="font-weight-bold">Full Name</label><br />
                            <input name='name' type="text" className="no-outline"
                                value={name} placeholder="Enter your name" required onChange={handleChange} />
                            <hr className="hr"/>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Email</label><br />
                            <input name='email' type="email" className="no-outline"
                                value={email} placeholder="Email Address" required onChange={handleChange} />
                            <hr className="hr"/>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Phone No</label><br />
                            <input name='phoneNo' type="tel" className="no-outline"
                                value={phoneNo} placeholder="+880" required onChange={handleChange} />
                            <hr className="hr"/>
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Password</label><br />
                            <input name='password' type="password" className="no-outline"
                                value={password} placeholder="*********" required onChange={handleChange} />
                            <hr className="hr"/>
                        </div>
                        <div class="form-group">
                            <input type="checkbox"/> I agree to the terms of user
                        </div>
                        <button type="submit" className="submit-btn">Create Account</button>
                        Already have an account! <Link to="/login">Please Login</Link> 
                    </form>
                </div>
            </div>
        </div>
    )
    const showSuccess=()=>{
        if(success) return(
            <div className="alert alert-primary">
                New Account Created.Please <Link to="/login">Login</Link> 
            </div>
        )
    }
    return (
        <Layout title="Register">
            {isAuthenticated()?<Redirect to="/"/>:''}
            {showSuccess()}
            {showLoading(loading)}
            {showError(error,error)}
            {signInForm()}
        </Layout>
    );
}

export default Register;

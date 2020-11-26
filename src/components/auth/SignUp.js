import React from "react";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from 'redux-form'

const SignUp = ({ createUserWithEmailAndPassword, ...props }) => {

    const handleSubmit = (formData) => {
        console.log(formData);
        createUserWithEmailAndPassword(formData.email, formData.password)
    }
    console.log(props);
    return (
        <div className='auth'>
            <div className="outer">
                <div className="inner">
                <SignUpReduxForm onSubmit={handleSubmit}/>
                </div>
            </div>
        </div>
    );
}

const SignUpForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <h3>Register</h3>

            <div className="form-group">
                <label>Email</label>
                <Field name="email" component="input" type="email" placeholder="Enter email" className="form-control" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <Field name="password" component="input" type="password" placeholder="Enter password" className="form-control" />
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                <NavLink className="nav-link" to="/sign-in">Log in</NavLink>
            </p>
        </form>
    )
}
const SignUpReduxForm = reduxForm({ form: 'login' })(SignUpForm)

export default SignUp

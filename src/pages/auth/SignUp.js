import { Formik } from "formik";
import React from "react";
import { NavLink, Redirect } from "react-router-dom";

const SignUp = ({ createUserWithEmailAndPassword, error, user, ...props }) => {
    const handleSubmit = (formData) => {
        createUserWithEmailAndPassword(formData.email, formData.password)
    }
    return (
        <>
            { user
                ? <Redirect to={'/'} />
                : <div className='auth'>
                    <div className="outer">
                        <div className="inner">
                            <SignUpFormikForm handleSubmit={handleSubmit} submitError={error} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}



const SignUpFormikForm = ({ handleSubmit, submitError, ...props }) => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required';
                }

                return errors;
            }}
            onSubmit={handleSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                ...props
            }) => (
                <form onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            className="form-control"
                            placeholder="Enter email"
                        />
                    </div>

                    {errors.email && touched.email && errors.email}
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            className="form-control"
                            placeholder="Enter password"
                        />
                    </div>

                    {errors.password && touched.password && errors.password}
                    {submitError}
                    <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={isSubmitting} >Register</button>
                    <p className="forgot-password text-right">
                        <NavLink className="nav-link" to="/sign-in">Log in</NavLink>
                    </p>
                </form>
            )}
        </Formik>
    )
}

export default SignUp

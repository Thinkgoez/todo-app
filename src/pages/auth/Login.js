import { Formik } from "formik";
import React from "react";
import { Redirect } from "react-router-dom";

const Login = ({ signInWithEmailAndPassword, user, ...props }) => {
    const handleSubmit = (formData) => {
        signInWithEmailAndPassword(formData.email, formData.password)
    }
    return (
        <>
            {user
                ? <Redirect to={'/'} />
                : <div className='auth'>
                    <div className="outer">
                        <div className="inner">
                            <LoginFormikForm handleSubmit={handleSubmit} submitError={props.error} />

                        </div>
                    </div>
                </div>
            }
        </>
    );
}

const LoginFormikForm = ({ handleSubmit, submitError, ...props }) => {
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
                    <h3>Log in</h3>
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
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    {submitError}
                    {errors.password && touched.password && errors.password}
                    <button type="submit" className="btn btn-dark btn-lg btn-block" disabled={isSubmitting} >Sign in</button>
                </form>
            )}
        </Formik>
    )
}

export default Login
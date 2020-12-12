import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom'



const SettingsForm = ({ userName, ...props }) => {
    return (
        <Formik
            initialValues={{ name: '' }}
            validate={values => {
                const errors = {};
                if (values.name === userName) {
                    errors.name = 'New name cannot be the same as the old';
                }
                return errors;
            }}
            onSubmit={(values, { resetForm }) => {
                props.handleClick(values)
                resetForm({ values: { name: '' } })
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            ...props
        }) =>
        (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rename:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className="form-control"
                        placeholder="New name"
                    />
                </div>

                {errors.name && touched.name && errors.name}
                <button type="submit" disabled={isSubmitting} className='btn btn-secondary'>Save</button>
            </form>
        )
            }
        </Formik>
    )
}

const UserInfo = ({ user, ...props }) => {
    const [userName, setuserName] = useState('')
    useEffect(() => {
        if (user) {
            setuserName(user.displayName)
        }
        return () => {
            setuserName('')
        }
    }, [user])

    const handleClick = (formData) => {
        user.updateProfile({ displayName: formData.name })
        setuserName(formData.name)
    }

    return (
        <>
            { !user
                ? <Redirect to='/' />
                : <div className='settings border'>
                    <h3>{userName}</h3>
                    <hr />
                    <SettingsForm handleClick={handleClick} userName={userName} />
                    <div className="form-group">
                        <label>Your ID:</label>
                        <p>{user.uid}</p>
                    </div>
                </div>
            }
        </>

    )
}



export default UserInfo
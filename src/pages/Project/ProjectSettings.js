import * as React from 'react'
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { removeProject, addUserToProject, setNewSettings } from '../../redux/firebaseReducer';


const SettingsForm = (props) => {
    return (
        <Formik
            initialValues={{ title: '', userID: '' }}
            validate={values => {
                const errors = {};
                if (values.title === props.title) {
                    errors.title = 'New title cannot be the same as the old value';
                }
                return errors;
            }}
            onSubmit={(values, { resetForm }) => {
                props.handleClick(values)
                resetForm({ values: { title: '', userID: '' } })
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
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            className="form-control"
                            placeholder="New title"
                        />
                    </div>

                    {errors.title && touched.title && errors.title}
                    <div className="form-group">
                        <label>Add new user to project:</label>
                        <input
                            type="text"
                            name="userID"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.userID}
                            className="form-control"
                            placeholder="Enter userID"
                        />
                    </div>
                    {errors.userID && touched.userID && errors.userID}
                    <button type="submit" disabled={isSubmitting} className='btn btn-secondary'>Save</button>
                </form>
            )
            }
        </Formik>
    )
}

const ProjectInfo = ({ removeNote, currentProject, loading, removeProject, ...props }) => {

    // Не забыть про поле owner в проекте
    // Мои проекты - проекты где ты owner

    if (Object.keys(currentProject).length === 0) {
        return (<Redirect to='/' />)
    }
    const handleClick = (formData) => {
        if(!!formData.userID)
            props.addUserToProject(currentProject, formData.userID)
        if(!!formData.title)
            props.setNewSettings(currentProject, formData.title);
    }

    return (
        <div className='settings border'>
            <h3>Settings {currentProject.title}</h3>
            <hr />
            <SettingsForm handleClick={handleClick} title={currentProject.title}/>
            <button className='btn btn-danger' onClick={() => removeProject(currentProject.id)}>Remove project</button>
        </div>
    )
}



const mapS = state => ({
    loading: state.firebase.loading,
    currentProject: state.firebase.currentProject,
    notes: state.firebase.notes,
})

export default connect(mapS, { removeProject, addUserToProject, setNewSettings })(ProjectInfo)

// Установка отображаемого имени пользователя, оно может быть не уникальным!
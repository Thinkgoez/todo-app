import * as React from 'react'
import { useEffect } from 'react';
import Form from '../components/Form';
import Projects from '../components/Projects';
import { Loader } from '../components/Loader';
import { connect } from 'react-redux';
import { addProject, fetchProjects, removeProject, setCurrentProject } from '../redux/firebaseReducer';

const Home = ({ projects, addProject, setCurrentProject, loading, removeProject, userID, ...props }) => {
    useEffect(() => {
        if (!!userID) {
            props.fetchProjects(userID)
        }
    }, [userID, props.fetchProjects])

    return (
        <>
            <Form handleSubmit={(fromData) => addProject(fromData.formValue, 'second', userID)} />
            <hr />
            {loading
                ? <Loader />
                : <Projects projects={projects} removeProject={removeProject} setCurrentProject={setCurrentProject} />
            }
        </>
    )
}

const mapS = state => ({
    loading: state.firebase.loading,
    userID: state.firebase.userID,
    projects: state.firebase.projects,
})

export default connect(mapS, { removeProject, fetchProjects, setCurrentProject, addProject })(Home)
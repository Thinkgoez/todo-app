import * as React from 'react'
import { useEffect } from 'react';
import Form from '../../components/Form';
import { Loader } from '../../components/Loader';
import { connect } from 'react-redux';
import { addNote, fetchNotes, removeNote, removeProject, onChangeCompleteNote } from '../../redux/firebaseReducer';
import { Notes } from '../../components/Notes';
import { NavLink, Redirect } from 'react-router-dom';


const ProjectInfo = ({
    onChangeCompleteNote, removeNote, addNote, fetchNotes,
    userID, currentProject, notes, loading,
    ...props
}) => {
    useEffect(() => {
        if (currentProject.id)
            fetchNotes(currentProject.id)
    }, [currentProject.id, fetchNotes])
    if (Object.keys(currentProject).length === 0) {
        return (<Redirect to='/' />)
    }

    return (
        <>
            <h3>{currentProject.title}</h3>
            {(userID === currentProject.owner)? <NavLink to={`/projects/settings/${currentProject.title}/`} className='btn btn-secondary'>Settings</NavLink> : null}
            <Form handleSubmit={(formData) => addNote(formData.formValue, currentProject.id)} />
            <hr />
            {props.loading
                ? <Loader />
                : <Notes
                    notes={notes}
                    onRemove={(noteID) => removeNote(currentProject.id, noteID)}
                    onCompleteNote={(note) => onChangeCompleteNote(note, currentProject.id)}
                />
            }
        </>
    )
}

const mapS = state => ({
    loading: state.firebase.loading,
    currentProject: state.firebase.currentProject,
    notes: state.firebase.notes,
    userID: state.firebase.userID,
})

export default connect(mapS, { removeProject, addNote, fetchNotes, removeNote, onChangeCompleteNote })(ProjectInfo)
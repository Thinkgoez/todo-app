//@flow
import * as React from 'react'
import { Fragment, useEffect } from 'react';
import Form from '../components/Form';
import { Notes } from '../components/Notes';
import { Loader } from '../components/Loader';
import { connect } from 'react-redux';
import { fetchNotes, removeNote } from '../redux/firebaseReducer';

const Home = ({loading, notes, fetchNotes, removeNote}): React.Node => {
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Form />
            <hr />
            {loading
                ? <Loader />
                : <Notes notes={notes} onRemove={removeNote} />
            }
        </Fragment>
    )
}

const mapD = state => ({
    loading: state.firebase.loading,
    notes: state.firebase.notes
})

export default connect(mapD, {fetchNotes, removeNote})(Home)
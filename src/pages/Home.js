//@flow
import * as React from 'react'
import { useEffect } from 'react';
import Form from '../components/Form';
import { Notes } from '../components/Notes';
import { Loader } from '../components/Loader';
import { connect } from 'react-redux';
import { fetchNotes, removeNote, onChangeCompleteNote } from '../redux/firebaseReducer';

type MapStateToProps = {
    loading: boolean,
    notes: Array<Object>,
};
type Props = {
    ...MapStateToProps,
    fetchNotes: () => void,
    removeNote: (id: string) => void,
    onCompleteNote: (id: string) => void
};


const Home = ({ loading, notes, fetchNotes, removeNote, onChangeCompleteNote }): React.Node => {
    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Form />
            <hr />
            {loading
                ? <Loader />
                : <Notes notes={notes} onRemove={removeNote} onCompleteNote={onChangeCompleteNote} />
            }
        </>
    )
}

const mapS = state => ({
    loading: state.firebase.loading,
    notes: state.firebase.notes
})

export default (connect<Props, _, _, _, _, _,>(mapS, { fetchNotes, removeNote, onChangeCompleteNote })(Home): React.AbstractComponent<{}>)
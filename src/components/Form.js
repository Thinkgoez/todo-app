//@flow
import *as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import {show} from '../redux/alertReducer'
import { addNote } from '../redux/firebaseReducer';

type Props = {
    show: (s: string) => void,
    addNote: (s: string) => void
};

const Form = ({show, addNote}): React.Node => {
    const [value, setValue] : [string, ((string => string) | string) => void] = useState('');

    const submitHandler = (event: SyntheticEvent<HTMLButtonElement>) : void => {
        event.preventDefault();

        if (value.trim()) {
            addNote(value.trim())
            setValue('');
        } else {
            show('Введите название заметки!');
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите название разметки"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    );
}

export default (connect<Props, _, _, _, _, _,>(null, {show, addNote})(Form): React.AbstractComponent<{}>)
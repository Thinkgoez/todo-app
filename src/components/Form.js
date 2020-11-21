//@flow
import *as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import {show} from '../redux/alertReducer'
import { addNote } from '../redux/firebaseReducer';

const Form = ({show, addNote}): React.Node => {
    const [value, setValue] : [string, ((string => string) | string) => void] = useState('');

    const submitHandler = (event: SyntheticEvent<HTMLButtonElement>) : void => {
        event.preventDefault();

        if (value.trim()) {
            addNote(value.trim()).then(() => {
                show('Заметка была создана!', 'success');
            }).catch(() => {
                show('Что-то пошло не так', 'danger');
            })

            setValue('');
        } else {
            show('Введите название заметки!');
        }

        // alert.show(value, 'success');
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

export default connect(null, {show, addNote})(Form)
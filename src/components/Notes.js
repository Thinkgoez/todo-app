import *as React from 'react';
// import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'


const Notes = ({ notes, onRemove, onCompleteNote, ...props }) => {
    return (
        <>
            <h3>Task list</h3>
            { notes.length !== 0 ?
                <TransitionGroup component="ul" className="list-group">
                    {notes.map(note => (
                        <CSSTransition
                            key={note.id}
                            classNames={'note'}
                            timeout={800}
                        >
                            <li className={`d-flex list-group-item note${note.completed ? ' completed' : ''}`} >
                                <div className='d-flex align-items-center'>
                                    <input
                                        type="checkbox"
                                        checked={note.completed}
                                        onChange={() => { onCompleteNote(note) }}
                                    />&nbsp;&nbsp;
                                <div className={'info'}>
                                        <strong>{note.title}</strong>
                                        <small>{new Date(note.date).toLocaleString()}</small>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => onRemove(note.id)}
                                    >
                                        &times;  {/* Крестик */}
                                    </button>
                                </div>
                            </li>
                        </CSSTransition>
                    ))

                    }

                </TransitionGroup>
                : <div>Здесь пока нету заметок...</div>
            }
        </>
    )
}

export { Notes }
// Notes.propTypes = {
//     onRemove: PropTypes.func,
//     notes: PropTypes.arrayOf(PropTypes.exact({
//         date: PropTypes.string,
//         id: PropTypes.string,
//         title: PropTypes.string
//       }))
// }
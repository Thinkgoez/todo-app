//@flow
import *as React from 'react';
// import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

type Props = {
    notes: Array<{
        id: string,
        title: string,
        date: string
    }>,
    onRemove: (id: string) => void,
}

const Notes = (props: Props): React.Node => {
    return (
        <TransitionGroup component="ul" className="list-group">
            {
                props.notes.map(note => (
                    <CSSTransition
                        key={note.id}
                        classNames={'note'}
                        timeout={800}
                    >
                        <li className="list-group-item note" >
                            <div>
                                <strong>{note.title}</strong>
                                <small>{new Date(note.date).toLocaleString()}</small>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => props.onRemove(note.id)}
                            >
                                &times;  {/* Крестик */}
                            </button>
                        </li>
                    </CSSTransition>
                ))
            }

        </TransitionGroup>
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
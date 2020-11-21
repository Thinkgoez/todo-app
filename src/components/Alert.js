//@flow
import *as React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { hide } from '../redux/alertReducer';

const Alert = ({ visible, type, text, hide }): React.Node => {
    return (
        <CSSTransition
            in={visible}
            timeout={{
                enter: 500,
                exit: 350
            }}
            classNames={'alert'}
            mountOnEnter
            unmountOnExit
        >
            <div className={`alert alert-${type || 'warning'} alert-dismissible`}>
                <strong>Внимание!</strong>
                {text}
                <button onClick={hide} type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </CSSTransition>
    );
}
const mapDispatchToProps = state => ({
    visible: state.alert.visible,
    text: state.alert.text,
    type: state.alert.type,
})
export default connect(mapDispatchToProps, { hide })(Alert)
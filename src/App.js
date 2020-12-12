import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import "firebase/database";
import 'firebase/auth';
import { connect } from 'react-redux';
import firebaseConfig from './firebaseConfig';
import Home from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import Alert from './components/Alert';
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import { setUserID, clearData } from './redux/firebaseReducer';
import ProjectInfo from './pages/Project/ProjectInfo';
import ProjectSettings from './pages/Project/ProjectSettings';
import UserInfo from './pages/auth/UserInfo';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth()
const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};


function App({ clearData, signOut, error, ...props }) {
    useEffect(() => {
        if (props.user) {
            props.setUserID(props.user.uid)
        } else {
            props.setUserID(null)
        }
        return () => {
            props.setUserID(null)
        };
    }, [props.user])
    const handleLogout = async () => {
        clearData()
        await signOut()
        
    }
    return (
        <BrowserRouter>
            <Navbar user={props.user} signOut={handleLogout} />
            <div className="container pt-4">
                <Alert />
                <Switch>
                    <Route path={'/'} exact component={() => <Home />} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/sign-up'} component={() => <SignUp {...props} />} />
                    <Route path={'/sign-in'} component={() => <Login {...props} />} />
                    <Route path={'/UserInfo'} component={() => <UserInfo {...props} />} />
                    <Route path={'/projects/settings/:projectTitle'} component={() => <ProjectSettings {...props} />} />
                    <Route path={'/projects/:projectTitle?'} component={() => <ProjectInfo />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const hocApp = withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(App);
export default connect(null, { setUserID, clearData })(hocApp)
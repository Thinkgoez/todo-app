import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';
import Home from './pages/Home';
import { About } from './pages/About';
import { Navbar } from './components/Navbar';
import Alert from './components/Alert';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


function App({...props}) {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container pt-4">
                <Alert />
                <Switch>
                    <Route path={'/'} exact component={Home} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/sign-up'} component={() => <SignUp {...props} />} />
                    <Route path={'/sign-in'} component={() => <Login {...props} />} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}


export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
  })(App);

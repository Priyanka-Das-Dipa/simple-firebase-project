
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase/firebase.init';
import { useState } from 'react';

const Login = () => {

    const [user, setUser] = useState()
    const auth = getAuth(app)
    console.log(app)
    const GoogleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()

    const handleGoogleSingIn = () =>{
        signInWithPopup(auth, GoogleProvider)
        .then(result => {
            const loggedInUser = result.user
            console.log(user)
            setUser(loggedInUser)
        })
        .catch(error =>{
            console.log('error', error.message)
        })
    } 

    const handleGithubSingIn = () =>{
        signInWithPopup(auth, githubProvider)
        .then( result =>{
            const loggedUser = result.user
            console.log(loggedUser)
            setUser(loggedUser)
        })
        .catch( error =>{
            console.log(error)
        })
    }

    const handleSingOut = () =>{
        signOut(auth)
        .then(result => {
            console.log(result)
            setUser(null)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    return (
        <div>
            {/* user ? logOut : login */}
            {
                user ?
                <button onClick={handleSingOut}>Google SignOut</button>
                :
                <>
                    <button onClick={handleGoogleSingIn}>Google Login</button>
                    <button onClick={handleGithubSingIn}>GitHub Login</button>
                
                </>

            }
            {/* this is called  rendering  */}
            {user && <div>
                {/* <h3>User: {user?.displayName}</h3> */}
                <h3>User: {user.displayName}</h3>
                <p>Email: {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;
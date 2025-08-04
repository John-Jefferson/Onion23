import './login.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
export const LoginPageComponent =  () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [action, setAction] = useState("Login")
    const navigate = useNavigate();
    document.body.style.backgroundColor = '#3e2a9f';
    const proceedMainPage = async (user) => {
        // Send email verification
        try{
            await fetch("http://localhost:3001/mainPage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    "email": user.user.email,
                    "uid": user.user.uid,
                    "action": action
                    })
            });
            alert(`The email & password you entered was: ${email} and ${password}. and the action is ${action}`)
            await navigate('/main', {
                state: {
                    uid: user.user.uid
                }
            });
        }
        catch (err) {
        console.error("Error:", err);
      }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let functionToUse = (action === "Sign-up") ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
        try {
        const userCredential = await functionToUse(auth, email, password);
        console.log("fetching....");
        await proceedMainPage(userCredential);
        } catch (error) {
        console.error(error);
        }
    }
    return (
        <div className="glass-container">
            <div className="login-box">
                <div className="loginSignUpDiv">
                    <button className="loginSignUpButton" onClick={(e)=>{setAction("Sign-up"); console.log(action);}}>Sign-up</button>
                    <div ></div>
                    <button className="loginSignUpButton" onClick={(e)=>{setAction("Login"); console.log(action);}}>Login</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <h1 className="fieldLabels">Email:</h1>
                    <input type="text" id="username" name="username" onChange={(e)=>{setEmail(e.target.value)}} required placeholder="Username" />
                    <h1 className="fieldLabels">Password:</h1>
                    <input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} required placeholder="Password" />

                    <button type="submit">{action}</button>
                </form>
            </div>
        </div>
    );
};
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try{
        await signOut(auth);
    }catch (error){
        console.log(error);
    }
  }

  console.log(auth?.currentUser?.email);
  return (
    <div>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      ></input>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="Password"
      ></input>
      <button onClick={handleClick}>Sign In</button>
      <button onClick={handleGoogleSignIn}> Sign In with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Auth;

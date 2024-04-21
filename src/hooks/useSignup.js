import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";

import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";

function useSignup() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useContext(GlobalContext);

  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        dispatch({ type: "  SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  const signupWithPasswordAndEmail = (email, password) => {
    console.log(email);
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        dispatch({ type: "  SIGN_IN", payload: user }).catch((error) => {
          const errorMessage = error.message;
          setError(errorMessage);
        });
      }
    );
  };

  return { signupWithGoogle, user, error, signupWithPasswordAndEmail };
}

export { useSignup };

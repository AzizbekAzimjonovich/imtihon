import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";

import { useContext } from "react";
import { GlobalContext } from "../context/useGlobalContext";

function useLogin() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(GlobalContext);

  const signInEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        dispatch({ type: "  SIGN_IN", payload: user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        setError(error);
      });
  };
  return { signInEmailAndPassword, user, error };
}

export default useLogin;

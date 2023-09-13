import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "./config";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        setUser(authUser);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  const signin = async provider =>
    await signInWithPopup(auth, providers[provider.toLowerCase()]);

  const signout = async () => await signOut(auth);

  return { user, signin, signout };
};
export { useFirebase };

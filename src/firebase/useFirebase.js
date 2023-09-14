import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { firebaseConfig } from "./config";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const useFirebase = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
    setDb(getFirestore(app));
  }, []);

  useEffect(() => {
    if (auth) {
      const updateUser = async (uid, newUser) => {
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, newUser, { merge: true });
      };

      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          setUser(null);
          return;
        }
        const newUser = {
          photoURL: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        };
        updateUser(authUser.uid, newUser);
        setUser({ uid: authUser.uid, ...newUser });
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth, db]);

  useEffect(() => {
    const handleSnapshot = data => {
      const messages = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(messages);
      setMessages(messages);
    };
    if (db) {
      const getMessages = handleSnapshot => {
        const q = query(collection(db, "messages"), orderBy("sentAt"));

        return onSnapshot(q, handleSnapshot);
      };

      const unsubscribe = getMessages(handleSnapshot);

      return () => {
        unsubscribe();
      };
    }
  }, [db]);

  const signin = async provider =>
    await signInWithPopup(auth, providers[provider.toLowerCase()]);

  const signout = async () => await signOut(auth);

  const sendMessage = async message => {
    await addDoc(collection(db, "messages"), message);
  };

  return { user, signin, signout, sendMessage, messages };
};
export { useFirebase };

import React, { useState, useEffect, useContext, createContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getAuth,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAkAVggSSCZ1Vx6R5ulZWk_jcZ98iILx_s',
  authDomain: 'genyuan-demo.firebaseapp.com',
  projectId: 'genyuan-demo',
  storageBucket: 'genyuan-demo.appspot.com',
  messagingSenderId: '294154150230',
  appId: '1:294154150230:web:ed27762576d777ac89f6f7'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signinWithGithub = () => {
    return signInWithPopup(auth, new GithubAuthProvider()).then((res) => {
      setUser(res.user);
    });
  };

  const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(null);
    });
  };

  const signinWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user);
    });
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signupWithEmail,
    signinWithEmail,
    signout
  };
}

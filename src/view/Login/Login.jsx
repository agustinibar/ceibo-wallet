import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from '../../firebase/config';

import styles from '../Login/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const createUserInFirestore = async (user) => {
    try {
      const userCollectionRef = doc(db, 'users', user.uid);
      await setDoc(userCollectionRef, {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        balance: 0
      });
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await createUserInFirestore(userCredential.user);
      navigate('/wallet');
    } catch (error) {
      console.log(error);
      alert('Algo ha salido mal!');
    }
  };

  const logIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/wallet');
    } catch (error) {
      console.log(error);
      alert('Algo ha salido mal!');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await createUserInFirestore(result.user);
      }

      setUser(result.user);
      navigate('/wallet');
    } catch (error) {
      console.log(error);
      alert('Algo ha salido mal!');
    }
  };

  return (
    <div className={styles.containerLogin}>
      <h1>{user ? `Bienvenido, ${user.email}` : 'Por favor, ingresa o registrate para usar la app'}</h1>
      <input type="text" placeholder="Escribe tu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Escribe una contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={logIn}>Ingresa</button>
      <button onClick={signInWithGoogle}>Google</button>
      {!user && (
        <>
          <label>Nombre</label>
          <input type="text" placeholder="Escribe tu nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <label>Apellido</label>
          <input type="text" placeholder="Escribe tu apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </>
      )}
      <button onClick={registerUser}>Registrate</button>
    </div>
  );
};

export default Login;

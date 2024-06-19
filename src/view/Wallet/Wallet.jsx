import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setBalance(userData.balance || 0);

            // Verifica si el nombre o apellido está vacío o no existe
            if (!userData.firstName || !userData.lastName) {
              navigate('/createUser');
            }
          } else {
            // Si no existe el documento del usuario, redirigir a login
            navigate('/login');
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]); // Añadir navigate como dependencia

  if (!user) {
    return <div>Loading...</div>;
  }

  const goMp = ()=>{
    navigate("/mp")
  }


  return (
    <div>
      <h1>Bienvenido, {user.firstName} :D</h1>
      <p>Balance: ${balance}</p>
      <button onClick={goMp}>Carga dinero con Mercado Pago</button>
    </div>
  );
};

export default Wallet;

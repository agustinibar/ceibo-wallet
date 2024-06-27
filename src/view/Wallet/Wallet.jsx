import { useState, useEffect } from "react";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wallet = () => {
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [btcPrice, setBtcPrice] = useState("");
  const [ethPrice, setEthPrice] = useState("");
  const [tetherPrice, setTetherPrice] = useState("");
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
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        navigate('/');
      }
    };
    const obtenerPrecioCriptomonedas = async () => {
      try {
        const btcSymbol = "bitcoin"
        const ethSymbol = "ethereum"
        const usdSymbol = "tether"
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
        const response1 = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`);
        // const response2 = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`);
      
        const btcPrice = response.data[btcSymbol].usd;
        const ethPrice = response1.data[ethSymbol].usd;
        // const tetherPrice = response2.data[usdSymbol].usd;
        setBtcPrice(btcPrice);
        setEthPrice(ethPrice);
        setTetherPrice(tetherPrice);

      } catch (error) {
        console.error("Error al obtener el precio de la criptomoneda: ", error);
        throw error;
      }
    };
    obtenerPrecioCriptomonedas();
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
      <h3>Compra Bitcoins facilmente:</h3>
      <p>Bitcoin: $ {btcPrice}</p>
      <p>Ethereum: ${ethPrice}</p>
      <p>USDT: ${tetherPrice}</p>
    </div>
  );
};

export default Wallet;

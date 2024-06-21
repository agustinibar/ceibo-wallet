import { useState } from 'react';
import styles from './depositmp.module.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { auth } from '../../../firebase/config';

const DepositMp = () => {
  const publicKey = 'APP_USR-7c5a86ed-549b-4977-a7c6-9cd503b22def';
  initMercadoPago(publicKey);
  const [total, setTotal] = useState(0);
  const [preferenceId, setPreferenceId] = useState(null);

  
  const createPreference = async () => {
    try {
      const response = await axios.post(`https://mp-crypto-server.onrender.com/createorder`, {
        description: "Ceibo Wallet deposit",
        price: Number(total),
        quantity: 1,
        currency_id: "ARS",
        user_id: auth.currentUser.uid
      });
      const { id } = response.data;
      console.log(id)
      return id;
    } catch (error) {
      alert("Algo salió mal con Mercado Pago, por favor, escríbenos por Whatsapp: +54 3487 522074");
      console.log(error);
    }
  };
  
  const handleMercadoPago = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };
  
  const handleTotal = (event) => {
    setTotal(event.target.value);
  };

  return (
    <>
      <div>
        <h2>Deposita fondos con tu cuenta de Mercado Pago</h2>
        <h4>¿Cuánto deseas cargar a tu cuenta?</h4>
        <input
          type="text"
          placeholder="$"
          value={total}
          onChange={handleTotal}
          className={styles.input}
        />
      </div>
      <button className={styles.mercadoPagoButton} onClick={handleMercadoPago}>
        Pagar con MercadoPago
      </button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}
    </>
  );
};

export default DepositMp;

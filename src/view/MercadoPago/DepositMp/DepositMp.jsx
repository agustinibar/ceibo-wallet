import { useEffect, useState } from 'react';
import styles from './depositmp.module.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const DepositMp = () => {
  const publicKey = 'APP_USR-7c5a86ed-549b-4977-a7c6-9cd503b22def';
  const [total, setTotal] = useState('');
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    if (publicKey) {
      initMercadoPago(publicKey);
    }
  }, [publicKey]);

  const createPreference = async () => {
    try {
      const response = await axios.post(`https://mp-crypto-server.onrender.com/createorder`, {
        description: "Ceibo Wallet deposit",
        price: parseFloat(total),
        quantity: 1,
        currency_id: "ARS"
      });

      const { id } = response.data;
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
          type="number"
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

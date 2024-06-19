import { useEffect, useState } from 'react';
import styles from './depositmp.module.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const DepositMp = () => {
  const publicKey = 'APP_USR-7c5a86ed-549b-4977-a7c6-9cd503b22def';
  
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(()=>{
    if(publicKey){
      initMercadoPago(publicKey);
    }
  }, []);

 
  return (
    <>
    <div>
      <h2>Deposita fondos con tu cuenta de mercado pago</h2>
      <h4>Cuanto deseas cargar a tu cuenta?</h4>
      <input type="text" placeholder="$"/>
    </div>
    <button className={styles.mercadoPagoButton}>Pagar con MercadoPago</button>
    
    </>
  )
}

export default DepositMp;